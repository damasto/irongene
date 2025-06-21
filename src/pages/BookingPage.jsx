import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const timeSlots = ["09:00-12:00", "13:00-16:00", "16:00-19:00"];

export default function BookingPage() {
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const {_id} = useParams();

  // Disable weekends
  const disableWeekends = (date) => {
    const day = date.day();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", date?.format("DD-MM-YYYY"));
    console.log("Selected Time Slot:", timeSlot);
    const newBooking = {
        date: date,
        timeSlot: timeSlot
    };

    bookAppointment();

  };

  const bookAppointment = () => {
    try {
        api.post(`/booking/${_id}`, newBooking)
    } catch(err) {
        console.log(err)
    }
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          margin: "auto",
          mt: 8,
          p: 4,
          background: "#f5f5f5",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Book your Enhancement
        </Typography>

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

          <Select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Select a time slot
            </MenuItem>
            {timeSlots.map((slot) => (
              <MenuItem key={slot} value={slot}>
                {slot}
              </MenuItem>
            ))}
          </Select>

          <Button type="submit" variant="contained" fullWidth>
            Book Now
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}
