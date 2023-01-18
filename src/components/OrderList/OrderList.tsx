import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import MyCard from "../MyCard/MyCard";
import { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../API/api";
import { AuthContext } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";

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
    const { token } = useContext(AuthContext);
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { register, formState: { errors, isValid }, handleSubmit } = useForm();
    const handleClickOpen = () => {
        setOpen(prev => !prev);
    };
    async function handleFormSubmit(data: any) {
        console.log(data);

        const newData = new FormData();
        newData.append("Image", data.Image);
        newData.append("Name", data.name);
        newData.append("Price", data.Price);
        newData.append("Size", data.Size);
        newData.append("TransferLocation.Latitude", "233.43");
        newData.append("TransferLocation.Longtitude", "233.43");
        newData.append("CurrentlyLocation.Latitude", "233.43");
        newData.append("CurrentlyLocation.Longtitude", "233.43");
        newData.append("Weight", "15.12");

        const truckData = await axios.post(`${BASE_URL}/orders`, newData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(truckData);

    }
    return (
        <>
            <Typography variant="h2" textAlign={"center"} gutterBottom marginTop={2}>{t("orders")}</Typography>
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
            <Button sx={{ display: "block", marginInline: "auto" }} onClick={() => setOpen(true)} variant="contained">
                Add new
            </Button>
            <Dialog open={open} onClose={handleClickOpen}>
                <DialogContent>
                    <form action="#" onSubmit={handleSubmit(handleFormSubmit)}>

                        <Stack spacing={3}>
                            <TextField {...register("Name")} placeholder="Enter your truck's name" type="text" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("Price")} placeholder="Enter your truck's max load" type="number" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("Image")} placeholder="Choose your truck's image" type="file" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("Weight")} placeholder="Enter your truck's max load" type="number" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("Size")} placeholder="Truck size" type="number" />
                        </Stack>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="is taken" />
                        <iframe width={300} height={170} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?q='41.269337','69.0565163'&hl=en&z=14&output=embed">
                        </iframe>

                        <DialogActions>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export function DefaultOrderList() {
    const { orders } = useContext(OrderContext);
    const { t } = useTranslation();
    return <>

        <Typography variant="h2" textAlign={"center"} gutterBottom marginTop={2}>{t("orders")}</Typography>

        <Grid container justifyContent={"center"} spacing={2}>
            {orders.map(order => {
                console.log(order);
                return <Grid key={order.id} xs={12} md={4} xl={3} item>
                    <MyCard title={order.name} order={order} isAdmin={false}>
                        <Typography variant="body2" color="text.secondary">
                            Weight: {order.weight}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Size: {order.size}
                        </Typography>
                        <Typography variant="body2" gutterBottom color="text.secondary">
                            Price: {order.price}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            {order.user.firstName} {order.user.lastName}
                        </Typography>
                    </MyCard>
                </Grid>
            })}
        </Grid>
    </>
} 
