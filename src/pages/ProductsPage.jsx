import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import CategoryBar from '../components/CategoryBar';
import axios from 'axios';


export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Prosthetics",
        "Optical Enhancements",
        "Neural Implants"
    ];

    const handleCatSelect = async (category) => {
        setSelectedCategory(category);

        try {
            setLoading(true)
            const res = await api.get("/api/products",
                { params: { category } }
            )
            setProducts(res.data)
        } catch (err) {
            console.error("Error fetching products: ", err.message)
        } finally {
            setLoading(false)
        }
    }

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/products");
            setProducts(res.data);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        console.log("products:", products)
    }, [products])

    useEffect(() => {
        console.log("category:", selectedCategory)
    }, [selectedCategory])



    if (loading) return <div>Loading…</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <CategoryBar categories={categories} onSelect={handleCatSelect} />
            {products.length > 0 ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    px={4}
                    py={6}
                    alignItems="center"
                >
                    <Grid 
                    container 
                    spacing={3}
                    justifyContent="center"
                    >
                        {products.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </Grid>
                </Box>
            ) : (
                <Typography variant="body1" color="red" align="center" sx={{ py: 6 }}>
                    Sorry, we haven't found any products.
                </Typography>
            )
            }
        </>

    );
}