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
import { Button, Link } from "@mui/material";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../lang/i18n";
import { AdminHeader } from "../components/Header/Header";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../API/api";
import Avatar from "@mui/material/Avatar";
const drawerWidth = 250;

export default function Profile({ window }: { window?: () => Window }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { token } = useContext(AuthContext);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState({});

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function handleLogout() {
        navigate("/");
    }
    useEffect(() => {
        async function getUser() {
            try {
                const userInfo = await axios.get(`${BASE_URL}/users`, {
                    headers: {
                        Authorization: "Bearer " + `${token}`
                    }
                });
                console.log(userInfo);

            } catch (error) {
                console.log(error);
            }
        }
        getUser();

    }, []);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <AdminHeader />
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
                <Box sx={{ overflow: 'auto', paddingTop: "1.5rem" }}>
                    <img width={200} height={200} style={{marginInline:"auto", borderRadius:"50%", marginBottom:"2rem"}} src="https://via.placeholder.com/200" />
                    <Typography variant="body1" textAlign={"center"} gutterBottom>
                        User name
                    </Typography>
                    <Typography variant="body1" textAlign={"center"} gutterBottom>
                        User email
                    </Typography>
                    
                    <List>
                        {[t("settings")].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <Link to={"settings"} underline="hover" color="GrayText" component={RouterLink}>
                                        {text}
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {[t("trucks"), t("orders")].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>

                                    <Link to={index === 0 ? "trucks" : index === 1 ? "orders" : "settings"} underline="hover" color="GrayText" component={RouterLink}>
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
                <Outlet />
            </Box>
        </Box>
    );
}