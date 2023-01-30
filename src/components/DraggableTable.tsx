import React, { Suspense } from "react";

import {
  Typography,
  Stack,
  Tooltip,
  CardMedia,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
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
  items?: ProductResponse["items"];
  keysOfItems: TypeKeyOfItem["keysOfItems"];
  setSequenceItem?: any;
  shortDragDropItems?: any;
  getProductsAPI: (
    config?: AxiosRequestConfig<any> | undefined,
    options?: RefetchOptions | undefined
  ) => AxiosPromise<any>;
  productLoading?: boolean;
  handleDrawerToggle: () => void;
}

const DraggableTable = ({
  items,
  keysOfItems,
  shortDragDropItems,
  getProductsAPI,
  productLoading,
  handleDrawerToggle,
}: TablePropsType) => {
  const { decimalPlaces } = useSelector((state) => state.main);

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
  const openImageModal = () => {};
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
                {keysOfItems?.map((column: any) => (
                  <TableCell
                    key={column.key}
                    align={column.align}
                    style={{ width: column?.width }}
                  >
                    {column.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
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
                              {keysOfItems?.map((column) => (
                                <TableCell
                                  key={column.key}
                                  align={column.align}
                                  style={{ width: column?.width }}
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
                                    addCurrency(row[column.key], row.currency)
                                  ) : column.key === "discount" ? (
                                    addCurrency(row[column.key], "")
                                  ) : column.key === "status" ? (
                                    <TableChip statusValue={row[column.key]} />
                                  ) : column.value === "Actions" ? (
                                    <TableActionsButton
                                      row={row}
                                      getProductsAPI={getProductsAPI}
                                      productLoading={productLoading}
                                      handleDrawerToggle={handleDrawerToggle}
                                    />
                                  ) : (
                                    <Typography className="tableColumnCss">
                                      {row[column.key]}
                                    </Typography>
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          );
                        }}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </DragDropContext>
    </>
  );
};

export default DraggableTable;
