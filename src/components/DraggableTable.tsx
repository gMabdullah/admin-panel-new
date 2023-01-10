import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "store";
import { Theme } from "@mui/system";
import {
  Box,
  Chip,
  Typography,
  Grid,
  Stack,
  Modal,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CardMedia } from "@mui/material";
import TableChip from "./TableChip";
//import { createStyles, makeStyles } from '@mui/material';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing(3),
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 650,
//     },
//   }),
// );

interface TablePropsType {
  items?: ProductResponse["items"];
  keysOfItems: TypeKeyOfItem["keysOfItems"];
}

const handleDragEnd = (result: any) => {
  // handle the end of a drag and drop event here
};

const DraggableTable = ({ items, keysOfItems }: TablePropsType) => {
  const { decimalPlaces } = useSelector((state) => state.main);
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
        <div>
          <Table>
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
                        {(provided: any, snapshot) => (
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
                                  <CardMedia
                                    component="img"
                                    image={row[column.key]}
                                    alt="Burger"
                                    sx={{
                                      height: "52px",
                                      width: "52px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  />
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
                                  <MoreVertIcon />
                                ) : (
                                  <Typography className="tableColumnCss">
                                    {row[column.key]}
                                  </Typography>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </div>
      </DragDropContext>
    </>
  );
};

export default DraggableTable;
