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
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../lang/i18n";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import {AdminHeader, Header} from "../Header/Header";
const drawerWidth = 120;

export default function Sidebar({ children, window }: { children: ReactNode, window?:()=>Window }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function handleLogout(){
        navigate("/");
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <AdminHeader/>
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
                <Box sx={{ overflow: 'auto', paddingTop:"1.5rem" }}>
                    <List>
                        {[t("trucks"), t("orders")].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    
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