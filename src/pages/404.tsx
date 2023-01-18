import { NotAccessible } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

export default function NotFound() {
    return (
        <Box sx={{ minHeight: "100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Typography variant="h2" fontSize={120} color={"darkcyan"}>
                404 Not Found
            </Typography>
        </Box>
    )
}
