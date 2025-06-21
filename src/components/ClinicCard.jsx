import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';

export default function ClinicCard({ image, name, location, description }) {
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: 350 },
        maxWidth: 400,
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
        height="200"
        image={image}
        alt={`${name} image`}
        sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {location}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button
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