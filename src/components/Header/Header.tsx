import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../lang/i18n";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";

export default function Header() {
  const {t} = useTranslation();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">
            {t("home_page_link")}
          </Typography>
          <LanguageSelect/>
          <Link variant="button" to="/login" component={RouterLink} underline="hover" color="#fff" sx={{ marginLeft: "auto", padding:"0.5rem 1rem", borderRadius:"5px", background:"crimson" }}>
            {t("login")}
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
