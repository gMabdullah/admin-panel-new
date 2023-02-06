import React, { Suspense } from "react";

import {
  Typography,
  Stack,
  Tooltip,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Checkbox,
} from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useSelector } from "store";
import TableChip from "./TableChip";
import TableActionsButton from "./TableActionsButton";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";
import Loader from "./Loader";
const AddMenuImages = React.lazy(() => import("imageSection/AddMenuImages"));

interface TablePropsType {
  items?: ProductResponse["items"] | [];
  setSequenceItem?: any;
  shortDragDropItems?: any;
  getProductsAPI: (
    config?: AxiosRequestConfig<any> | undefined,
    options?: RefetchOptions | undefined
  ) => AxiosPromise<any>;
  productLoading?: boolean;
  triggerEditProduct: (
    itemId: string,
    dispatch: React.Dispatch<Action>
  ) => void;
  setSelectedRowIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRowIds: string[];
}

const DraggableTable = ({
  items,
  shortDragDropItems,
  getProductsAPI,
  productLoading,
  triggerEditProduct,
  setSelectedRowIds,
  selectedRowIds,
}: // checkBox = false,
TablePropsType) => {
  const { decimalPlaces, productColumns } = useSelector((state) => state.main);

  const handleAllRowsSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      items && setSelectedRowIds(items.map((item) => item.menu_item_id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleRowSelectionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    if (e.target.checked) {
      setSelectedRowIds([...selectedRowIds, itemId]);
    } else {
      setSelectedRowIds(selectedRowIds.filter((rowId) => rowId !== itemId));
    }
  };

  const isRowSelected = (itemId: string) => selectedRowIds.includes(itemId);

  const handleDragEnd = (result: any) => {
    const sortArray = [
      {
        source: result.source.index,
        destination: result.destination.index,
      },
    ];
    shortDragDropItems(sortArray);
    // handle the end of a drag and drop event here
  };

  const addCurrency = (value: any, currency: any) => {
    return (
      <Stack direction="row" spacing={0.25} sx={{ alignItems: "center" }}>
        {currency !== "" && (
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "10px",
              lineHeight: "12px",
              color: "#757575",
            }}
          >
            {currency}
          </Typography>
        )}
        {
          <Typography
            variant="subtitle1"
            sx={{
              color: "#212121",
              marginLeft: currency !== "" ? "" : "100px",
            }}
          >
            {value ? parseFloat(value).toFixed(decimalPlaces) : value}
          </Typography>
        }
      </Stack>
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selectedRowIds.length > 0 ? true : false}
                    onChange={handleAllRowsSelection}
                    sx={{
                      p: "unset",

                      // "&.Mui-checked": {
                      //   color: "#2196F3",
                      // },
                    }}
                  />
                </TableCell>

                {productColumns?.map((column: any) =>
                  column.selected ? (
                    <TableCell
                      key={column.key}
                      align={column.align}
                      style={{ width: column?.width }}
                    >
                      {column.value}
                    </TableCell>
                  ) : (
                    ""
                  )
                )}
              </TableRow>
            </TableHead>

            {items &&
            items[0] !== undefined &&
            items !== null &&
            items[0].toString() === "" ? (
              <div>No Data Found</div>
            ) : (
              <Droppable droppableId="table">
                {(provided, snapshot) => (
                  <TableBody ref={provided.innerRef}>
                    {items &&
                      items.map((row: any, index: number) => (
                        <Draggable
                          key={index}
                          draggableId={index + ""}
                          index={index}
                        >
                          {(provided: any, snapshot) => {
                            return (
                              // Drag and drop on table
                              <TableRow
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                isDragging={snapshot.isDragging}
                              >
                                <TableCell>
                                  <Checkbox
                                    checked={isRowSelected(row.menu_item_id)}
                                    onChange={(e) =>
                                      handleRowSelectionChange(
                                        e,
                                        row.menu_item_id
                                      )
                                    }
                                    sx={{
                                      p: "unset",

                                      // "&.Mui-checked": {
                                      //   color: "#2196F3",
                                      // },
                                    }}
                                  />
                                </TableCell>

                                {productColumns?.map((column) =>
                                  column.selected ? (
                                    <TableCell
                                      key={column.key}
                                      align={column.align}
                                      style={{
                                        width: column?.width,
                                        marginLeft: `${
                                          column.key === "price" &&
                                          "10px !important"
                                        }`,
                                      }}
                                    >
                                      {column.key === "image" ? (
                                        <Suspense fallback={<Loader />}>
                                          <AddMenuImages
                                            imageUrl={row[column.key]}
                                            itemId={row.menu_item_id}
                                          />
                                        </Suspense>
                                      ) : column.key === "name" ? (
                                        <>
                                          <Typography variant="h5">
                                            {row[column.key]}
                                          </Typography>
                                          <Tooltip
                                            placement="top-start"
                                            title={row.desc}
                                          >
                                            <div
                                              className="menu-description-css"
                                              style={{ fontSize: "10px" }}
                                            >
                                              {row.desc}
                                            </div>
                                          </Tooltip>
                                        </>
                                      ) : column.key === "price" ? (
                                        addCurrency(
                                          row[column.key],
                                          row.currency
                                        )
                                      ) : column.key === "discount" ? (
                                        addCurrency(row[column.key], "")
                                      ) : column.key === "status" ? (
                                        <TableChip
                                          statusValue={row[column.key]}
                                        />
                                      ) : column.value === "Actions" ? (
                                        <TableActionsButton
                                          row={row}
                                          getProductsAPI={getProductsAPI}
                                          productLoading={productLoading}
                                          triggerEditProduct={
                                            triggerEditProduct
                                          }
                                          disableOnRowSelection={
                                            selectedRowIds.length > 0
                                              ? true
                                              : false
                                          }
                                        />
                                      ) : (
                                        <Typography className="tableColumnCss">
                                          {row[column.key]}
                                        </Typography>
                                      )}
                                    </TableCell>
                                  ) : (
                                    ""
                                  )
                                )}
                              </TableRow>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            )}
          </Table>
        </TableContainer>
      </DragDropContext>
    </>
  );
};

export default DraggableTable;
