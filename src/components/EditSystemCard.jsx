import { Card, CardContent, Typography, Button, Box } from "@mui/material"




export default function EditSystemCard({ title, id, onAction }) {


    return (
        <Card
            sx={{
                margin: "20px 15px",
                width: { xs: '100%', sm: 550 },
                height: { xs: "100%", sm: 150 },
                maxWidth: 600,
                height: "50%",
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#ffffff',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',

                },
            }}
        >
            <CardContent

                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    padding: 0
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={600}
                    textAlign="center"
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        marginTop: 5
                    }}

                    width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} >
                    <Button variant="outlined" onClick={(event) => onAction("create", id, event)}>
                        Create new
                    </Button>
                    <Button
                        variant="contained">
                        Edit existing
                    </Button>
                </Box>
            </CardContent>

        </Card>

    )
}