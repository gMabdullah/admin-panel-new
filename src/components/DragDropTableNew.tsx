import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Theme } from '@mui/system';
import { items, keysofItems } from './ItemObject';
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
interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const rows1:any=[
    {
    id:1,name:"India", code:32323232, population:323232, size:32323, density:3232323,   
},
{
    id:2,name:"China", code:32323232, population:323232, size:32323, density:3232323
}]
const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];
const handleDragEnd = (result:any) => {
    // handle the end of a drag and drop event here
  };
const DragDropTableNew:React.FC=()=> {
  return (
    <>
<DragDropContext onDragEnd={handleDragEnd}>


<div >
<Table>
    <TableHead>
        <TableRow >
        {keysofItems.map((column:any) => (
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
      {items.map((row:any, index:number) => (
        <Draggable key={index} draggableId={index +""} index={index}>
          {(provided:any, snapshot) => (
            <TableRow
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
            >
              {keysofItems.map((column) => (
                <TableCell
                  key={column.key}
                  // align={column.align}
                  // style={{ minWidth: column?.minWidth }}
                >
                  {row[column.key]}
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