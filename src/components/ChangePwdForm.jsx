import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
} from '@mui/material';
import api from '../api/axios';

export default function ChangeEmailForm() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.currentPassword.trim() && formData.newPassword.trim() && formData.confirmNewPassword.trim()) {

        }
        console.log('Form submitted:', formData);

    };

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
                margin:0,

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
                            type="text"
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
                            type="text"
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
