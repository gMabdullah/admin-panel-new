import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableRow from '@mui/material/TableRow';
import { Theme } from '@mui/system';
import {
  Box,
  Chip,
  Typography,
  Grid,
  Stack,
  Modal,
  IconButton,
} from "@mui/material";
import {

  CardMedia,
 
} from "@mui/material";
import TableChip from './TableChip';
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
interface tablePropsType {
  items?:ProductResponse["items"]
  keysOfItems:typeKeyOfItem["keysOfItems"]
}

const handleDragEnd = (result:any) => {
    // handle the end of a drag and drop event here
  };
const DragDropTableNew=({items,keysOfItems}:tablePropsType)=> {
  return (
    <>
<DragDropContext onDragEnd={handleDragEnd}>


<div >
<Table>
    <TableHead>
        <TableRow >
        {keysOfItems?.map((column:any) => (
                <TableCell
                  key={column.key}
                  align={column.align}
                  style={{ minWidth: column?.minWidth }}
                >
                  {column.value}
                </TableCell>
              ))}
        </TableRow>
      
    </TableHead>
    <Droppable droppableId="table">
  {(provided, snapshot) => (
    <TableBody ref={provided.innerRef}>
      {items  && items.map((row:any, index:number) => (
        <Draggable key={index} draggableId={index +""} index={index}>
          {(provided:any, snapshot) => (
            <TableRow                 // Drag and drop on table
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
            >
              {keysOfItems?.map((column) => (

               
                <TableCell
                  key={column.key}
                  align={column.align}
                 // style={{ minWidth: column?.minWidth }}
                >
                  {column.key ==="image" ? 
                               <CardMedia
                                component="img"
                                image={row[column.key]}
                                alt="Burger"
                                sx={{
                                  height: "52px",
                                  width: "52px",
                                }}
                              />
                              :column.key ==="status" ?
                              
                             ( <TableChip statusValue={row[column.key]}/>)
                            :column.value ==="Actions" ?
                            (<MoreVertIcon/>)
                           : row[column.key]}
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
  )
}

export default DragDropTableNew