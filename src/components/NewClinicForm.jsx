

export default function NewClinicDialog() {

    return (
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
    InputLabel
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../api/axios";


const timeSlots = ["09:00-12:00", "13:00-16:00", "16:00-19:00"];

export default function BookingForm({ title, handleSubmit, clinicId, setDate, setTimeSlot, setSelectedProcedure, date, timeSlot, selectedProcedure }) {
    const specialities = ["Neurogentic Integration & Implantation", "Synthetics Engineering", "Morphogentic Architecture"];
    const procedures = [
        "Craniofacial Biomatrix Transplantation (CBT)",
        "Maxillodermal Reconstruction with Neural Reinnervation (MRNR)",
        "Intracortical Neural Interface Implantation (INII)",
        "Cerebral Electromechanical Integration Procedure (CEIP)",
        "Myoskeletal Prosthetic Integration (MPI)",
        "Neurokinetic Augmented Extremity Implantation (NALI)",
        "Subretinal Optoelectronic Implantation (SOI)",
        "Photonic Retinal Augmentation Surgery (PRAS)"
     ];
    

  

    const disableWeekends = (date) => {
        const day = date.day();
        return day === 0 || day === 6; // Sunday = 0, Saturday = 6
    };

    const getProcedures = async () => {
        try {
            const res = await api.get(`/api/clinics/${clinicId}/procedures`);
            setProcedures(res.data.procedures)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProcedures()
    }, [])

    return (
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
                   {title}
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    gap={3}
                >
                    <FormControl>
                        <Select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            displayEmpty
                            variant="outlined"
                        >
                            <MenuItem value="" disabled>
                                Specialities
                            </MenuItem>
                            {specialities.map((option, i) => (
                                <MenuItem key={i} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="speciality-label">Speciality</InputLabel>
                        <Select
                            labelId="speciality-label"
                            value={spe}
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
                </Box>
            </Paper>
    );
}
}