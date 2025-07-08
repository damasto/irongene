import MotionCards from "../components/MotionCards";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";

export default function HomePage () {
    return (
        <>
            <Box
            component="main"
            sx={{
              minHeight: '100vh',
              backgroundImage: 'url(/images/expertise.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',          
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
            >
                <MotionCards/>
            </Box>
        </>
    )
}