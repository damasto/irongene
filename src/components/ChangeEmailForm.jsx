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

export default function ChangeEmailForm({ setMessage, toggleDialog, hideForm, email }) {
    const [formData, setFormData] = useState({
        newEmail: '',
        confirmNewEmail: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(null)
    const { newEmail, confirmNewEmail, password } = formData
    const { verifyEmail } = useContext(VerifyInputContext)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailCheck = (() => {
            if (!newEmail.trim() || !confirmNewEmail.trim() || !password.trim()) {
                setErrorMessage("Please fill out all fields")
                return false
            };

            if(email === newEmail) {
                setErrorMessage("Please choose an email different from your current one")
                return false
            }

            if (newEmail !== confirmNewEmail) {
                setErrorMessage("Emails do not match!")
                return false
            };

            if (!verifyEmail(newEmail)) {
                setErrorMessage("Provide a valid email address.")
                return false
            };

            return true
        })();

        if (emailCheck) {
            changeEmail();
            setMessage("Email has been changed successfully");
            toggleDialog(true);
            setTimeout(() => {
                toggleDialog(false)
                setMessage("")
            }, 3000)
            hideForm();
        }
    };

    const changeEmail = async () => {
        const updateEmail = {
            newEmail: newEmail,
            enteredPassword: password
        }

        try {
            const res = await api.put("api/users/profile/email", updateEmail);
            console.log('Form submitted:', updateEmail);
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
                Change Email
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
                            label="New email"
                            name="newEmail"
                            type="email"
                            value={formData.newEmail}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="Confirm new email"
                            name="confirmNewEmail"
                            type="email"
                            value={formData.confirmNewEmail}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
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
