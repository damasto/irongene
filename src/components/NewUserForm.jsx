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
} from "@mui/material";
import { useContext, useState } from "react";
import { FormDataContext } from "../context/formData.context";
import ConfirmationDialog from "./ConfirmationDialog";
import api from "../api/axios";
import { VerifyInputContext } from "../context/inputVerification.context";


export default function NewUserForm({ open, onClose }) {
    const { handleChange, formData, errorMessage, setErrorMessage, openButtonRef } = useContext(FormDataContext)
    const {verifyEmail, verifyPassword, emailNotValid, pwdNotValid} = useContext(VerifyInputContext)

    const textFields = ["firstName", "lastName", "email", "role", "password"]
    const roles = ["user", "admin"];
    const [dialogOpen, setDialogOpen] = useState(false)
    const dialogMessage = "User has been created."
    

    const handleClose = () => {
        setDialogOpen(false)
        openButtonRef.current?.focus()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        const textFieldsFilled = textFields.every((field) => { return typeof formData[field] === "string" && formData[field].trim() !== '' }
        );

        if(!verifyEmail(formData.email)) {
            setErrorMessage(emailNotValid);
            return
        }

        if(!verifyPassword(formData.password)) {
            setErrorMessage(pwdNotValid);
            return
        }

        if (!textFieldsFilled) {
            setErrorMessage("Please fill out all fields");
            return
        } 

        if (textFieldsFilled) {
            createNewUser();
            return
        }
    }

    const createNewUser = async () => {
        try {
            const res = await api.post("/auth/signup", formData);
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
                    label="First Name"
                    name="firstName"
                    type="text"
                    value={formData.firstName || ""}
                    onChange={handleChange}

                ></TextField>
                <TextField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={formData.lastName || ""}
                    onChange={handleChange}

                ></TextField>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                ></TextField>
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                ></TextField>
                <FormControl>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        label="role-label"
                        name="role"
                        value={formData.role || ""}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {roles.map((role, i) => (
                            <MenuItem key={i} value={role || ""}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" fullWidth>
                    Create User
                </Button>
                {errorMessage && <Typography variant="body2" color="error.main">{errorMessage}</Typography>}
                <ConfirmationDialog open={dialogOpen} message={dialogMessage} onClose={handleClose} />
            </Box>
        </Paper>
    );
}