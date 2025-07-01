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

export default function ChangePwdForm({setMessage, toggleDialog, hideForm}) {

    const formDataModel = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }
    const [formData, setFormData] = useState(formDataModel);
    const { currentPassword, newPassword, confirmNewPassword } = formData;
    const { verifyPassword } = useContext(VerifyInputContext);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (currentPassword.trim() && newPassword.trim() && confirmNewPassword.trim()) {
            if (newPassword === confirmNewPassword) {
                if (verifyPassword(newPassword)) {
                    changePassword();
                    setMessage("Password has been successfully changed");
                    toggleDialog(true)
                    setTimeout(() => {
                        toggleDialog(false)
                        setMessage("");
                    }, 3000);
                    hideForm();
    
                } else {
                    return
                }
            } else {
                console.log("Passwords do not match!")
            }
        } else {
            console.log("Please fill out all fields")
        }
        

    };

    const changePassword = async () => {
        const changedPwd = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }
        try {
            const res = await api.put("/api/users/profile/password", changedPwd)
        } catch (err) {
            console.log(err)
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
