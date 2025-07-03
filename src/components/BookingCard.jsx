import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
} from '@mui/material';

export default function BookingCard({ bookingData}) {
    const {clinic, date, timeSlot, _id} = bookingData;
    console.log("in card", bookingData)
    const {clinicName} = clinic

    console.log("clinic")

    const formatter = new Intl.DateTimeFormat("en-GB");
    const newDate = formatter.format(new Date(date))

    const cancelBooking = async () => {
        const cancelBooking = {
            status: "cancelled"
        }
        const res = await api.put(`/api/bookings/${_id}`, )
    }
    

    return (
        <Card
            sx={{
                width: { xs: '100%', sm: 550 },
                maxWidth: 600,
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#ffffff',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={""}
                alt={` image`}
                sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            />
            <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                Hi XX
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    You have an appointement at {clinicName} from {timeSlot}h on the {newDate}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>

                </Typography>
                <Box display="flex" justifyContent="flex-end">

                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 8,
                            textTransform: 'none',
                            borderColor: '#999',
                            color: '#333',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                                borderColor: '#333',
                            },
                        }}
                    >
                        Cancel Booking
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}