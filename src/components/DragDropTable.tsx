import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
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

interface Data {
  id:number;
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
    id:number,
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return {id, name, code, population, size, density };
}
const rows1:any=[
    {
    id:1,name:"India", code:32323232, population:323232, size:32323, density:3232323,   
},
{
    id:2,name:"China", code:32323232, population:323232, size:32323, density:3232323
}]
const rows = [
  createData(1,'India', 'IN', 1324171354, 3287263),
  createData(2,'China', 'CN', 1403500365, 9596961),
  createData(3,'Italy', 'IT', 60483973, 301340),
  createData(4,'United States', 'US', 327167434, 9833520),
  createData(5,'Canada', 'CA', 37602103, 9984670),
  createData(6,'Australia', 'AU', 25475400, 7692024),
  createData(7,'Germany', 'DE', 83019200, 357578),
  createData(8,'Ireland', 'IE', 4857000, 70273),
  createData(9,'Mexico', 'MX', 126577691, 1972550),
  createData(10,'Japan', 'JP', 126317000, 377973),
];

export default function ColumnGroupingTable() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDragEnd = (result:any) => {
    // handle the end of a drag and drop event here
  };
  return (
    
    <Paper sx={{ width: '100%' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Droppable droppableId="droppable">
            {(provided, snapshot)=>(
                <div ref={provided.innerRef}>
                 <Table stickyHeader aria-label="sticky table">
  <TableHead>
    <TableRow>
      <TableCell align="center" colSpan={2}>
        Country
      </TableCell>
      <TableCell align="center" colSpan={3}>
        Details
      </TableCell>
    </TableRow>
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ top: 57, minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
  <TableBody>
    {rows1
    //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row:any,index:any) => {
        return (
            <Draggable key={row.id} draggableId={row.id + ""} index={index}>
          
            {(provided, snapshot)=>(
           <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                       {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === 'number'
                    ? column.format(value)
                    : value}
                </TableCell>
              );
            })}
          </TableRow>
            ) }

          </Draggable>
        );
      })}
             {provided.placeholder}
  </TableBody>
</Table>
                </div>
 
            )
            }
      
        </Droppable>
        
      </TableContainer>
      </DragDropContext>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
