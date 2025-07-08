import { Box, Typography } from "@mui/material";


export default function NoPermissionsPage () {

    return (
        <Box
        component={"main"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        height="500px"
        >
            <Typography variant="h1" color="error.main">403 - FORBIDDEN</Typography>
            <Typography variant="h6"> You do not have sufficient permissions to access this server.</Typography>
        </Box>
    )
}