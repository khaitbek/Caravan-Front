import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField, Typography } from "@mui/material";
import MyCard from "../MyCard/MyCard";
import { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../API/api";

function createData(
    name: string,
    MaxLoad: number,
    isEmpty: boolean,
    Description: string,
    TruckNumber: number,
    Lat: number,
    Long: number,
    LocationId: number
) {
    return { name, TruckNumber, Description, Lat, Long, LocationId };
}

export function AdminOrderList() {
    const { orders } = useContext(OrderContext);
    const [open, setOpen] = useState(false);
    const { register, formState: { errors, isValid }, handleSubmit } = useForm();
    const handleClickOpen = () => {
        setOpen(prev => !prev);
    };
    async function handleFormSubmit(data: object) {
        const truckData = await fetch(`${BASE_URL}/trucks`,{
            method:"POST",
            headers:{
                "Authorization":``
            }
        }) 
    }
    return (
        <>
            <Grid container justifyContent={"center"} marginBottom={5} spacing={2}>
                {orders.map(order => {
                    return <Grid key={order.id} item>
                        <MyCard title={order.name} order={order} isAdmin={true} >
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </MyCard>
                    </Grid>
                })}
            </Grid>
            
        </>
    );
}

export function DefaultOrderList() {
    const { orders } = useContext(OrderContext);
    return <Grid container justifyContent={"center"} spacing={2}>
        {orders.map(order => {
            return <Grid key={order.id} xs={12} md={4} xl={3} item>
                <MyCard title={order.name} order={order} isAdmin={false}>
                    <Typography variant="body2" color="text.secondary">
                        {JSON.stringify(order)}
                    </Typography>
                </MyCard>
            </Grid>
        })}
    </Grid>
} 
