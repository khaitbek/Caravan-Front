import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from "@mui/material";
import MyCard from "../MyCard/MyCard";

function createData(
    name: string,
    MaxLoad: number,
    isEmpty: boolean,
    Description: string,
    TruckNumber: number,
    Lat:number,
    Long:number,
    LocationId:number
) {
    return { name, TruckNumber, Description, Lat, Long, LocationId };
}

const rows = [
    createData("Order name", 100, true, "Order description", 1, 12,15, 5),
    createData("Order name", 200, false, "Order description", 1, 65, 15, 45),
    createData("Order name", 15, true, "Order description", 1, 23, 87, 4),
    createData("Order name", 57, false, "Order description", 1, 12, 45, 98)
];

export function AdminOrderList() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Truck Number&nbsp;(g)</TableCell>
                        <TableCell align="center">Description&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((order) => (
                        <TableRow
                            key={order.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{order.name}</TableCell>
                            <TableCell align="center">{order.TruckNumber}</TableCell>
                            <TableCell align="center">{order.Description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function DefaultOrderList(){
    return <Grid container justifyContent={"center"} spacing={2}>
        {rows.map(order => {
            
            return <Grid xs={3} item>
                <MyCard title={order.name}>
                    <Typography variant="body2" color="text.secondary">
                        {order.Description}
                    </Typography>
                </MyCard>
            </Grid>
        })}
    </Grid>
} 
