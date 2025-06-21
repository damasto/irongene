import { Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: "column",
                alignItems: 'center',
                px: 4,
                py: 2,
                backgroundColor: '#f9f9f9',
                borderTop: '1px solid #e0e0e0',
                color: '#1a1a1a',
                mt: 'auto',
            }}
        >
            <IconButton
                href="https://github.com/damasto/irongene"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
            >
                <GitHubIcon />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 300 }}>
                © 2058 IronGene
            </Typography>
        </Box>
    );
}