import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Button, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
const drawerWidth = 240;

export default function Sidebar({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    function handleLogout(){
        navigate("/");
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin Page
                    </Typography>
                    <Typography sx={{ marginLeft: "auto" }} variant="h6" noWrap component="div">
                        <Link to="/" underline="hover" color="inherit" component={RouterLink}>
                            Home
                        </Link>
                    </Typography>
                    <Button onClick={handleLogout} sx={{ marginLeft: "1rem" }} color="error" variant="contained">
                        Log out
                    </Button>
                    
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {["Trucks", "Orders"].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <FireTruckIcon /> : <ListAltIcon />}
                                    </ListItemIcon>
                                    <Link to={index % 2 === 0 ? "trucks" : "orders"} underline="hover" color="GrayText" component={RouterLink}>
                                        {text}
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />

                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}