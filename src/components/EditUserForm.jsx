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
    Dialog,
    DialogTitle,
} from "@mui/material";
import { useContext, useState } from "react";
import { FormDataContext } from "../context/formData.context";
import ConfirmationDialog from "./ConfirmationDialog";
import api from "../api/axios";
import { VerifyInputContext } from "../context/inputVerification.context";



export default function EditUserForm({open, onClose, user}) {
    const { handleChange, formData, errorMessage, setErrorMessage, openButtonRef } = useContext(FormDataContext)
    const { verifyEmail, verifyPassword, emailNotValid, pwdNotValid } = useContext(VerifyInputContext)
    const [isDisabled, setIsDisabled] = useState(false)
    const roles = ["user", "admin"];
    const [dialogOpen, setDialogOpen] = useState(false)
    const dialogMessage = "User has been updated."

    console.log("current user", user)
    
    const handleClose = () => {
        setDialogOpen(false)
        openButtonRef.current?.focus()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        if (formData.email) {
            if(!verifyEmail(formData.email)) {
                setErrorMessage(emailNotValid);
                return
            }
        }

        if (formData.password) {
            
            if(!verifyPassword(formData.password)) {
                setErrorMessage(pwdNotValid);
                return
            }
        }

       
            updateUser(user._id);
            return
    
    }

    const updateUser = async (userId) => {
        try {
            const res = await api.put(`/api/users/${userId}`, formData);
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
        <>
        <Dialog
        onClose={onClose}
        open={open}
        fullWidth
        sx={{
            maxWidth:"md"
        }}
        >
            <DialogTitle textAlign={"center"}>Edit User</DialogTitle>
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
                        value={formData.firstName ?? user.firstName ?? ""}
                        onChange={handleChange}
                        disabled={isDisabled}

                    ></TextField>
                    <TextField
                        label="Last Name"
                        name="lastName"
                        type="text"
                        value={formData.lastName || user.lastName}
                        onChange={handleChange}
                        disabled={isDisabled}

                    ></TextField>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email || user.email}
                        onChange={handleChange}
                        disabled={isDisabled}
                    ></TextField>
                    <TextField
                        label="Change User Password"
                        name="password"
                        type="password"
                        value={formData.password || ""}
                        onChange={handleChange}
                        disabled={isDisabled}
                    ></TextField>
                    <FormControl>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            label="role-label"
                            name="role"
                            value={formData.role || user.role}
                            onChange={handleChange}
                            variant="outlined"
                            disabled={isDisabled}
                        >
                            {roles.map((role, i) => (
                                <MenuItem key={i} value={role || ""}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" fullWidth>
                        Update User
                    </Button>
                    {errorMessage && <Typography variant="body2" color="error.main">{errorMessage}</Typography>}
                    <ConfirmationDialog open={dialogOpen} message={dialogMessage} onClose={handleClose} />
                </Box>
            </Paper>
            </Dialog>
        </>
    );

}