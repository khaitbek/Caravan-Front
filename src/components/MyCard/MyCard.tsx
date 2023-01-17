import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactNode, useContext } from "react";
import { BASE_URL, getOrders } from "../../API/api";
import { Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { OrderContext } from "../../context/OrderProvider";


export default function MyCard({ children, title, order, isAdmin = false }: { children: ReactNode, title: string, order: any, isAdmin: boolean }) {
    const { token } = useContext(AuthContext);
    const {setOrders} = useContext(OrderContext);
    
    function handleDelete() {
        try {
            fetch(`${BASE_URL}/orders/${order.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            }).then(res => {
                res.json().then(async(data) => {
                    if(data){
                        const newOrders = await getOrders();
                        setOrders(newOrders.data);
                    }
                })
            }).catch(err => {
                console.log(err);
            })

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card sx={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.4)" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {order.user.firstName[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
            />
            <CardMedia
                component="img"
                width={200}
                height="194"
                image={"https://via.placeholder.com/200"}
                alt="Paella dish"
            />
            <CardContent>
                {children}
            </CardContent>
            {isAdmin ?
                <CardActions>
                    <Button variant="contained" color="error" onClick={handleDelete} >Delete</Button>
                    <Button variant="contained" color="success">Edit</Button>
                </CardActions>
                : null}

        </Card>
    );
}