import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/es';
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/auth.context";

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.locale("es");

const timeSlots = ["09:00-12:00", "13:00-16:00", "16:00-19:00"];

export default function RescheduleBooking({ open, onClose, booking }) {
    const [date, setDate] = useState(dayjs(booking.date));
    const [timeSlot, setTimeSlot] = useState(booking.timeSlot);
    const [procedures, setProcedures] = useState([]);
    const [selectedProcedure, setSelectedProcedure] = useState(booking.procedure);
    const [dialogMessage, setDialogMessage] = useState("");
    const [error, setError] = useState(null);
    const clinicId = booking.clinic._id;
    const bookingId = booking._id

    console.log("bkId:", bookingId)

    const navigate = useNavigate();

    useEffect(() => {
        getProcedures();
    }, [])


    const getProcedures = async () => {
        try {
            const res = await api.get(`/api/clinics/${clinicId}/procedures`);
            setProcedures(res.data.procedures)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`api/bookings/${booking._id}`, {
                date: date,
                timeSlot: timeSlot,
                procedure: selectedProcedure,
            });
            setDialogMessage("Booking successfully rescheduled!");
            onClose(); // Close dialog after success
            navigate("/profile");
        } catch (err) {
            console.log(err)
            setDialogMessage("Failed to reschedule booking.");
        }
    };

    const disableWeekends = (date) => {
        const day = date.day();
        return day === 0 || day === 6; // Sunday = 0, Saturday = 6
    };

    console.log(booking.procedure)
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Reschedule Booking</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    mt={1}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DatePicker
                            label="Select a date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            shouldDisableDate={disableWeekends}
                            inputFormat="DD/MM/YYYY"
                            disablePast
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <FormControl fullWidth>
                        <InputLabel>Time Slot</InputLabel>
                        <Select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            label="Time Slot"
                        >
                            {timeSlots.map((slot) => (
                                <MenuItem key={slot} value={slot}>
                                    {slot}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Procedure</InputLabel>
                        <Select
                            value={selectedProcedure}
                            onChange={(e) => setSelectedProcedure(e.target.value)}
                            label="Procedure"
                        >
                            {procedures.length > 0 ? (
                                procedures.map((procedure, i) => (
                                    <MenuItem key={i} value={procedure}>
                                        {procedure}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No procedures available</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" fullWidth>
                        Reschedule
                    </Button>

                    {dialogMessage && (
                        <Typography variant="body2" color="error">
                            {dialogMessage}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
