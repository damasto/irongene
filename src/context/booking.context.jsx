
import React, { useState, useEffect } from "react";
import api from "../api/axios";

const BookingContext = React.createContext();

function BookingProviderWrapper(props) {

      const [date, setDate] = useState(null);
      const [timeSlot, setTimeSlot] = useState("");
      const [procedures, setProcedures] = useState([])
      const [selectedProcedure, setSelectedProcedure] = useState("")
      const [newBooking, setNewBooking] = useState(bookingSchema)
      const timeSlots = ["09:00-12:00", "13:00-16:00", "16:00-19:00"];
      const bookingSchema = {
        date: "",
        timeSlot: "",
        procedure: "",
      }

      const getProcedures = async () => {
        try {
          const res = await api.get(`/api/clinics/${_id}/procedures`);
          setProcedures(res.data.procedures)
        } catch (err) {
          console.log(err)
        }
      }

      const disableWeekends = (date) => {
        const day = date.day();
        return day === 0 || day === 6; // Sunday = 0, Saturday = 6
      };

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
    

    return (
        <BookingContext.Provider value={{ 
          setDate, 
          timeSlots,
          timeSlot,
          setTimeSlot, 
          setProcedures, 
          setSelectedProcedure,
          newBooking, 
          setNewBooking, 
          procedures,
          getProcedures,
          disableWeekends,
          


          }}>
            {props.children}
        </BookingContext.Provider>
    )
}

export { BookingProviderWrapper, BookingContext };
