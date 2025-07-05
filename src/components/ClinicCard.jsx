import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function ClinicCard({clinicName, location, description, _id, speciality }) {

    const image = `/images/${_id}.png`
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/clinics/${_id}`)
    }

    const handleButtonClick = (e) => {
        e.stopPropagation();
        navigate(`/booking/${_id}`)
    }
    return (
        <Card
            onClick={handleCardClick}
            sx={{
                width: { xs: '100%', sm: 550 },
                maxWidth: 600,
                borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#ffffff',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <CardMedia
                component="img"
                height="250"
                image={image}
                alt={`${clinicName} image`}
                sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16, objectPosition: "center" }}
            />
            <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    {clinicName}
                </Typography>
                <Box
                component="hr"
                ></Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                   <Box component="span" fontWeight="bold">Speciality: </Box>{speciality}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }} gutterBottom>
                     {description}
                </Typography>
        
                <Box display="flex" justifyContent="space-between">

                <Typography variant="body2" gutterBottom alignSelf="flex-end">
                    Astrometric Anchor: <Box component="span" fontWeight="bold" fontStyle="italic" >{location}</Box>
                </Typography>
                    <Button
                        onClick={handleButtonClick}
                        variant="outlined"
                        sx={{
                            borderRadius: 8,
                            textTransform: 'none',
                            borderColor: '#999',
                            color: '#333',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                                borderColor: '#333',
                            },
                        }}
                    >
                        Book Appointment
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}