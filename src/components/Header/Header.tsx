import { AppBar, Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../lang/i18n";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from "@mui/icons-material/Menu"
import { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { AuthContext } from "../../context/AuthProvider";
import GradingIcon from '@mui/icons-material/Grading';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import Divider from "@mui/material/Divider";
import { Logout, Settings } from "@mui/icons-material";

export function Header(props: { window?: () => Window }) {
  const { t } = useTranslation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container = window !== undefined ? () => window().document.body : undefined;
  const drawerWidth = 240;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="header" sx={{ display: {xs:"none", md:"flex"}, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Box component="div" sx={{display:"flex"}}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                to="/"
                component={RouterLink}

                sx={{
                  mr: 2,
                  display: { md: 'none', xl: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "2.5rem", listStyle:"none" }} component={"ul"}>
              <Typography variant="h6" component={"li"} sx={{display:"flex", alignItems:"center"}}>
                <Typography variant="h6" color="#fff" sx={{marginRight:"1rem"}} component={RouterLink} to="/">
                  {t("orders")}
                </Typography>
                <GradingIcon />
              </Typography>
              <Typography variant="h6" component={"li"} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" sx={{ marginRight: "1rem" }} color="#fff" component={RouterLink} to="/trucks">
                  {t("trucks")}
                </Typography>
                <FireTruckIcon />
              </Typography>
            </Box>
            <Box component="div" sx={{ display: "flex", gap: "2rem", alignItems: "inherit" }}>
              <LanguageSelect />
              <Link variant="button" to="/login" component={RouterLink} underline="hover" color="#fff" sx={{ marginLeft: "auto", padding: "1rem", borderRadius: "5px", background: "crimson" }}>
                {t("login")}
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            zIndex:"100000"
          }}
        >
          <LanguageSelect marginLeft="1" />
          <Link variant="button" to="/login" component={RouterLink} underline="hover" color="#fff" sx={{ marginInline: "0.4rem", padding: "0.5rem 1rem", borderRadius: "5px", background: "crimson" }}>
            {t("login")}
          </Link>
        </Drawer>
      </Box>
    </Box>
  )
}
export function AdminHeader(props: { window?: () => Window }) {
  const { t } = useTranslation();
  const {setToken} = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container = window !== undefined ? () => window().document.body : undefined;
  const drawerWidth = 240;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="header" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Box component="div" sx={{ display: "flex" }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                to="/"
                component={RouterLink}

                sx={{
                  mr: 2,
                  display: { md: 'none', xl: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
            </Box>
           
            <Box component="div" sx={{ display: "flex", gap: "2rem", alignItems: "inherit" }}>
              <LanguageSelect />
              {/* <Link variant="button" to="/login" onClick={()=>{
                localStorage.removeItem("token");
                setToken("");
              }} component={RouterLink} underline="hover" color="#fff" sx={{ marginLeft: "auto", padding: "1rem", borderRadius: "5px", background: "crimson" }}>
                {t("logout")}
              </Link> */}
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar />
                  <RouterLink to="/admin/profile">
                    {t("profile")}
                  </RouterLink>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <RouterLink to="/admin/profile/settings">
                    {t("settings")}
                  </RouterLink>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <RouterLink to="/login" onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                  }}>
                    {t("logout")}
                  </RouterLink>
                </MenuItem>
              </Menu>
            </Box>
            
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}

          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            zIndex: "100000"
          }}
        >
          <LanguageSelect marginLeft="1" />
          <Link variant="button" to="/login" component={RouterLink} underline="hover" color="#fff" sx={{ marginInline: "0.4rem", padding: "0.5rem 1rem", borderRadius: "5px", background: "crimson" }}>
            {t("login")}
          </Link>
        </Drawer>
      </Box>
    </Box>
  )
}