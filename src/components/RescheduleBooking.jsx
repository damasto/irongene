import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Menu,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Form, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/auth.context";

const timeSlots = ["09:00-12:00", "13:00-16:00", "16:00-19:00"];

export default function RescheduleBooking() {
    return (
        <Dialog open={open} >
            <DialogTitle>Reschedule Booking</DialogTitle>
            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={3}
            >
                <DatePicker
                    label="Select a Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    shouldDisableDate={disableWeekends}
                    disablePast
                    renderInput={(params) => <TextField {...params} />}
                />
                <FormControl>
                    <Select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        displayEmpty
                        variant="outlined"
                    >
                        <MenuItem value="" disabled>
                            Select a time frame
                        </MenuItem>
                        {timeSlots.map((slot) => (
                            <MenuItem key={slot} value={slot}>
                                {slot}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="procedure-label">Procedure</InputLabel>
                    <Select
                        labelId="procedure-label"
                        value={selectedProcedure}
                        label="selectedProcedure"
                        onChange={(e) => setSelectedProcedure(e.target.value)}
                    >
                        {procedures.length > 0 ? (
                            procedures.map((procedure, i) => {
                                return <MenuItem key={i} value={procedure}>{procedure}</MenuItem>
                            })
                        ) : (
                            <MenuItem disabled> Procedures not available...</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" fullWidth>
                    Book Now
                </Button>
                <DialogContent>
                    <Typography variant="body2">
                        {message}
                    </Typography>
                </DialogContent>
            </Box>
        </Dialog>
    );
}