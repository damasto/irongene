import { Box, Button } from "@mui/material";
import EditSystemCard from "../components/EditSystemCard";

export default function SystemAdminPage () {

    
    return (
       <Box
       sx={{
        width:"100%",
        borderRadius: 4,
        height: '100%',
        backgroundColor: "transparent",
        backgroundImage: "none",
        color: '#fff',
        cursor: 'pointer',
        boxShadow: 1,
        display: "flex",
        
    }}
       >
       <EditSystemCard title="Clinics"/>
       <EditSystemCard title="Bookings"/>
       <EditSystemCard title="Users"/>
       </Box>
    )
}