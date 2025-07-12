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
    DialogContent,
    Dialog
} from "@mui/material";
import { useContext, useState, useRef, useEffect } from "react";
import { FormDataContext } from "../context/formData.context";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "./ConfirmationDialog";
import api from "../api/axios";


export default function NewClinicForm({ open, onClose }) {
    const textFields = ["clinicName", "clinicSlug", "description", "location", "speciality"]
    const arrayFields = ["procedure"]
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


    const [dialogOpen, setDialogOpen] = useState(false)
    const navigate = useNavigate();
    const dialogMessage = "Clinic has been created."
    const { handleChange, formData, errorMessage, setErrorMessage, setFormData, openButtonRef } = useContext(FormDataContext)


    useEffect(() => {
        console.log("clinic data", formData)
    }, [formData])

    const handleClose = () => {
        setDialogOpen(false)
        openButtonRef.current?.focus()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const textFieldsFilled = textFields.every((field) => { return typeof formData[field] === "string" && formData[field].trim() !== '' }
        );
        const arrayFieldsFilled = arrayFields.every((field) => Array.isArray(formData[field]) && formData[field].length > 0)

        console.log(textFieldsFilled, arrayFieldsFilled)

        if (textFieldsFilled && arrayFieldsFilled) {
            createNewClinic();
            return
        }

        if (!textFieldsFilled || !arrayFieldsFilled) {
            setErrorMessage("Please fill out all fields")
        } 
    }

    const createNewClinic = async () => {
        try {
            const res = await api.post("/api/clinics", formData);
            setDialogOpen(true)
            setTimeout(() => {
                setDialogOpen(false);
                window.location.reload()
            }, 3000);
        } catch (err) {
            if (err.response) {
                setErrorMessage(err.response.data.message);
            } else {
                console.log("Network Error", err.message)
                setErrorMessage(err.message)
            }
        }
    }



    return (
        <Paper
            elevation={0}
            sx={{
                width: "100%",
                maxWidth: 400,
                margin: "0 auto",
                mt: 2,
                p: 4,
                background: "#f5f5f5",
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>

            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={3}
                sx={{ mt: 0 }}
            >
                <TextField
                    label="Clinic Name"
                    name="clinicName"
                    type="text"
                    value={formData.clinicName || ""}
                    onChange={handleChange}

                ></TextField>
                <TextField
                    label="Clinic Slug"
                    name="clinicSlug"
                    type="text"
                    value={formData.clinicSlug || ""}
                    onChange={handleChange}

                ></TextField>
                <TextField
                    label="Description"
                    name="description"
                    type="text"
                    value={formData.description || ""}
                    onChange={handleChange}
                ></TextField>
                <TextField
                    label="Clinic Location"
                    name="location"
                    type="text"
                    value={formData.location || ""}
                    onChange={handleChange}
                ></TextField>
                <FormControl>
                    <InputLabel id="speciality-label">Speciality</InputLabel>
                    <Select
                        label="speciality-label"
                        name="speciality"
                        value={formData.speciality || ""}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {specialities.map((option, i) => (
                            <MenuItem key={i} value={option || ""}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="procedures-label">Procedures</InputLabel>
                    <Select
                        labelId="procedures-label"
                        name="procedures"
                        value={formData.procedures || []}
                        multiple
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                procedures: e.target.value,
                            }))
                        }
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {procedures.map((procedure, i) => {
                            return <MenuItem key={i} value={procedure}>{procedure}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" fullWidth>
                    Create Clinic
                </Button>
                {errorMessage && <Typography variant="body2" color="error.main">{errorMessage}</Typography>}
                <ConfirmationDialog open={dialogOpen} message={dialogMessage} onClose={handleClose} />
            </Box>
        </Paper>
    );
}