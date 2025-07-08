import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ClinicCard from '../components/ClinicCard';
import api from '../api/axios';



export default function ClinicsPage() {

    const [clinics, setClinics] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    const getClinics = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/clinics");
            setClinics(res.data);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getClinics();
    }, []);

    useEffect(() => {
        console.log("clinic:", clinics)
    }, [clinics])

    if (loading) return <div>Loading…</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {clinics.length > 0 ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    px={4}
                    py={6}
                    alignItems="center"
                >
                    {clinics.map((clinic, i) => (
                        <ClinicCard key={i} {...clinic} />
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 6 }}>
                    No clinics available at the moment.
                </Typography>
            )
            }
        </>

    );
}