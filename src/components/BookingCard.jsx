import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { useState } from 'react';
import RescheduleBooking from './RescheduleBooking';
import { useEffect } from 'react';
import DeleteAccountDialog from './DeleteAccountDialog';
import api from '../api/axios';

export default function BookingCard({ bookingData, onBookingUpdate }) {
    const [showBookingDialog, setShowBookingDialog] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showRemoveDialog, setShowRemoveDialog] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [error, setError] = useState(null)
    const [color, setColor] = useState("green");
    const [formattedDate, setFormattedDate] = useState("")
    const { clinic, date, timeSlot, _id, procedure, status } = bookingData;
    const { clinicName } = clinic;
    const image = `/images/${clinic._id}.png`
    const title = "Cancel booking"
    const dialogMessage = "Are you sure you want to cancel your booking? This cannot be undone"
    const action = "cancel"


    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-GB");
        setFormattedDate(formatter.format(new Date(date)));

        if (status === "Cancelled") {
            setColor("error.main");
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
            setColor("green");
        }

    }, [date, timeSlot, status]);

    const handleRescheduleClose = (updated) => {
        setShowBookingDialog(false);
        setShowCancelDialog(false)
        if (updated && onBookingUpdate) {
            onBookingUpdate()
        }
    }


    const cancelBooking = async () => {
        const cancelBooking = {
            status: "Cancelled"
        }

        try {
            const res = await api.put(`/api/bookings/${_id}`, cancelBooking)
            setShowCancelDialog(false)
            onBookingUpdate()
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message)
            } else {
                console.error("Network error", err.message)
            }
        }
    };

    const onRemove = async () => {
        try {
            const res = await api.delete(`/api/bookings/${_id}`);
            setShowRemoveDialog(false)
            onBookingUpdate()
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message)
            } else {
                setError("Unable to connect to the server")
                console.error("Network error: ", err.message)
            }
        }
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
                image={image}
                alt={` image`}
                sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Your appointment:
                </Typography>
                <List disablePadding dense>
                    <ListItem disableGutters>
                        <ListItemText
                            primary={"Clinic:"}
                            secondary={clinicName}
                            slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                        />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText
                            primary={"Date:"}
                            secondary={formattedDate}
                            slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                        />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText
                            primary={"Hour:"}
                            secondary={timeSlot}
                            slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                        />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText
                            primary={"Booked procedure:"}
                            secondary={procedure}
                            slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                        />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText
                            primary={"Status:"}
                            secondary={status}
                            slotProps={{
                                primary: { sx: { fontWeight: 600 } },
                                secondary: { sx: { color: color } }
                            }}
                        />
                    </ListItem>
                </List>
                <Box display="flex" justifyContent="flex-end" gap="10px">
                    <Button
                        disabled={isDisabled}
                        onClick={() => { setShowBookingDialog(true) }
                        }
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
                        Reschedule
                    </Button>
                    <RescheduleBooking open={showBookingDialog} booking={bookingData} formattedDate={formattedDate} onClose={handleRescheduleClose} />
                    {status === "Scheduled" && (
                        <>
                            <Button
                                onClick={() => setShowCancelDialog(true)}
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
                                Cancel
                            </Button>
                            <DeleteAccountDialog
                                open={showCancelDialog}
                                onClose={() => setShowCancelDialog(false)}
                                onConfirm={cancelBooking}
                                title={title}
                                message={dialogMessage}
                                action={action}
                            />
                        </>
                    )}
                    {status === "Cancelled" && (
                        <>
                            <Button
                                onClick={() => setShowRemoveDialog(true)}
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
                                Remove
                            </Button>
                            <DeleteAccountDialog
                                open={showRemoveDialog}
                                onClose={() => setShowRemoveDialog(false)}
                                onConfirm={onRemove}
                                title={"Remove Booking"}
                                message={"Do you want to permanently delete this booking?"}
                                action={"Remove"}
                            />
                        </>
                    )}
                </Box>
            </CardContent>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
        </Card>
    );
}