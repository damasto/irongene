import React, { useContext, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
} from '@mui/material';
import api from '../api/axios';
import { VerifyInputContext } from '../context/inputVerification.context';
import { useNavigate } from 'react-router-dom';

export default function ChangePwdForm({ setMessage, toggleDialog, hideForm }) {

    const formDataModel = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }
    const [formData, setFormData] = useState(formDataModel);
    const { currentPassword, newPassword, confirmNewPassword } = formData;
    const { verifyPassword } = useContext(VerifyInputContext);
    const [errorMessage, setErrorMessage] = useState(null)


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const passwordChecks = (() => {
            if (!currentPassword.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
                setErrorMessage("Please fill out all fields!");
                return false
            };

            if (newPassword !== confirmNewPassword) {
                setErrorMessage("Passwords do not match")
                return false
            };

            if (currentPassword === newPassword) {
                setErrorMessage("Please select a password different from your current one")
                return false
            };

            if (!verifyPassword(newPassword)) {
                setErrorMessage("Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.")
                return false
            }

            return true
        })();

        if (passwordChecks) {
            changePassword();
        }
    };

    const changePassword = async () => {
        const changedPwd = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }
        try {
            const res = await api.put("/api/users/profile/password", changedPwd)
            setMessage("Password has been successfully changed");
            toggleDialog(true)
            setTimeout(() => {
                toggleDialog(false)
                setMessage("");
            }, 3000);
            hideForm();
        } catch (err) {
            if(err.response) {
                if(err.response.status  === 401) {
                    setErrorMessage("Incorrect Password")
                } else {
                    setErrorMessage(err.response.data.message)
                }
            } else {
                console.error("Network error: ", err.message);
                setErrorMessage("Unable to connect to the server")
            }
        }
    }

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 400,
                mx: 'auto',
                mt: 6,
                borderRadius: 4,
                backgroundColor: '#f8f9fa',
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                margin: 0,

            }}
        >
            <Typography variant="h5" gutterBottom>
                Change Password
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate

            >
                <Grid container spacing={2} direction={"column"}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            fullWidth
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="New password"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            type="password"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}

                    <Grid item xs={12} sm={8}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
