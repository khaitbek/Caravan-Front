import { Avatar, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { TruckContext } from "../../context/TruckContext";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getOrders, getTrucks } from "../../API/api";
import { AuthContext } from "../../context/AuthProvider";
import { red } from "@mui/material/colors";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import MyCard from "../MyCard/MyCard";
import { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../API/api";
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

export function AdminTruckList() {
    const { trucks, setTrucks } = useContext(TruckContext);
    const { token } = useContext(AuthContext);
    const { t } = useTranslation();
    function handleDelete(id: number) {
        try {
            fetch(`${BASE_URL}/trucks/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => {
                res.json().then(async (data) => {
                    if (data) {
                        const newTrucks = await getTrucks();
                        setTrucks(newTrucks.data);
                    }
                })
            }).catch(err => {
                console.log(err);
            })

        } catch (error) {
            console.log(error);
        }
    }
    const [open, setOpen] = useState(false);
    const { register, formState: { errors, isValid }, handleSubmit } = useForm();
    const handleClickOpen = () => {
        setOpen(prev => !prev);
    };
    const handleFormSubmit = async (data: object) => {
        console.log(data);

        const formValues = new FormData();
        Object.entries(data).forEach(item => {
            if (item[0] === "Image") {
                formValues.append(`${item[0]}`, item[1][0]);
                console.log(`${item[0]}`, item[1][0]);


            } else {
                formValues.append(`${item[0]}`, item[1]);

            }
        });
        formValues.append("MaxLoad", "1234");
        formValues.append("TruckNumber", "2");
        formValues.append("TruckLocation.Latitude", "3344")
        formValues.append("TruckLocation.Longitude", "3344")

        const truckData = await fetch(`${BASE_URL}/trucks`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formValues
        }).then(res => res.json()).then(data => {
            console.log(data);

        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <Typography variant="h2" textAlign={"center"} gutterBottom marginTop={2}>{t("trucks")}</Typography>
            <Grid container justifyContent={"center"} marginBottom={5} spacing={2}>
                {trucks?.map(truck => {
                    return <Grid key={truck.id} item>
                        <Card sx={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.4)" }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {truck.user.firstName[0]}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={truck.name}
                            />
                            <CardMedia
                                component="img"
                                width={200}
                                height="194"
                                image={"http://e-karvon.uz/" + truck.imagePath}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography>
                                    {truck.description}
                                </Typography>
                                <Typography>
                                    {truck.phoneNumber}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="error" onClick={() => handleDelete(truck.id)} >Delete</Button>
                                <Button variant="contained" color="success">Edit</Button>
                            </CardActions>

                        </Card>
                    </Grid>
                })}
            </Grid>
            <Button sx={{ display: "block", marginInline: "auto" }} onClick={() => setOpen(true)} variant="contained">
                Add new
            </Button>


            <Dialog open={open} onClose={handleClickOpen}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText
                    >
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <form action="#" onSubmit={handleSubmit(handleFormSubmit)}>

                        <Stack spacing={3}>
                            <TextField {...register("Name")} placeholder="Enter your truck's name" type="text" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("Image")} placeholder="Choose your truck's image" type="file" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("MaxLoad ")} placeholder="Enter your truck's max load" type="number" />
                        </Stack>
                        <Stack spacing={3}>
                            Is your truck available
                            <TextField {...register("IsEmpty")} placeholder="Is your truck available" type="checkbox" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("Description")} placeholder="Enter your truck's description" type="text" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("TruckLocation.Latitude")} placeholder="Enter your truck's Latitude" type="text" />
                        </Stack>
                        <Stack spacing={3}>
                            <TextField {...register("TruckLocation.Longitude")} placeholder="Enter your truck's Longitude" type="text" />
                        </Stack>

                        <DialogActions>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export function DefaultTruckList() {
    const { trucks } = useContext(TruckContext);
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="h2" textAlign={"center"} gutterBottom marginTop={2}>{t("trucks")}</Typography>

        <Grid container justifyContent={"center"} spacing={2}>
            {trucks.map(truck => {
                return <Grid key={truck.id} item>
                    <Card sx={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.4)" }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {truck.user.firstName[0]}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={JSON.stringify(truck)}
                        />
                        <CardMedia
                            component="img"
                            width={200}
                            height="194"
                            image={"https://via.placeholder.com/200"}
                            alt="Paella dish"
                        />
                        <CardContent>

                        </CardContent>

                    </Card>
                </Grid>
            })}
        </Grid>
        </>
    );
} 
