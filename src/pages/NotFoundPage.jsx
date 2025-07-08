import { Box, Typography } from "@mui/material";


export default function NotFoundPage () {

    return (
        <Box
        component={"main"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        height="500px"
        >
            <Typography variant="h1" color="error.main">404 - PAGE NOT FOUND</Typography>
            <Typography variant="h6"> The path you entered seems not to exist.</Typography>
        </Box>
    )
}