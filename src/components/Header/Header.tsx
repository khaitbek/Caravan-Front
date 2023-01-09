import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">
            Home Page
          </Typography>
          <Link variant="button" to="/login" component={RouterLink} underline="hover" color="#fff" sx={{ marginLeft: "auto", padding:"0.5rem 1rem", borderRadius:"5px", background:"crimson" }}>
            Login
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
