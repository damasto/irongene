
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
    

    return (
        <VerifyInputContext.Provider value={{ setDate, setTimeSlot, setProcedures, setSelectedProcedure, setNewBooking, timeSlots}}>
            {props.children}
        </VerifyInputContext.Provider>
    )
}

export { VerifyInputProviderWrapper, VerifyInputContext };
