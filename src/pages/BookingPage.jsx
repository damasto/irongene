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
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Form, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/auth.context";
import ConfirmationDialog from "../components/ConfirmationDialog";

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.locale("es");
const timeSlots = ["09:00-12:00", "13:00-16:00", "16:00-19:00"];

export default function BookingPage() {
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [procedures, setProcedures] = useState([])
  const [selectedProcedure, setSelectedProcedure] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [error, setError] = useState(null)
  const { _id } = useParams();
  const navigate = useNavigate();


  // Disable weekends

  useEffect(() => {
    getProcedures();
  }, [])

  const disableWeekends = (date) => {
    const day = date.day();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", date?.format("DD-MM-YYYY"));
    console.log("Selected Time Slot:", timeSlot);

    bookAppointment();

  };

  const getProcedures = async () => {
    try {
      const res = await api.get(`/api/clinics/${_id}/procedures`);
      setProcedures(res.data.procedures)
    } catch (err) {
      console.log(err)
    }
  }

  const bookAppointment = async () => {

    const newBooking = {
      date: date,
      timeSlot: timeSlot,
      procedure: selectedProcedure
    };

    console.log("id:", _id, "newBooking: ", newBooking)
    if (!_id || !newBooking) {
      console.log("Missing booking data")
      return
    }

    try {
      const res = await api.post(`api/bookings/${_id}`, newBooking);
      setDialogMessage("We have booked your appointment. You'll be redirected to our homepage")
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false)
        setTimeout(()=> {
          navigate("/")
        }, 1000)

      }, 4000)
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message)
      } else {
        console.error("Network error: ", err.message)
        setError("Unable to connect to the server")
      }
    }
  };


  useEffect(() => {
    console.log("prods", procedures)
  }, [procedures])


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
            inputFormat="DD/MM/YYYY"
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
                Select a time slot
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
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth>
            Book Now
          </Button>
        </Box>
        <ConfirmationDialog open={showDialog} message={dialogMessage} />
      </Paper>
    </LocalizationProvider>
  );
}

