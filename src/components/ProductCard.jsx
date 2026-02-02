import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Grid,
    CardActions,
    IconButton
} from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/cart.context';




export default function ProductCard({productTitle, price, _id }) {

    const image = `/images/${_id}.png`
    const navigate = useNavigate();
    const {addItem} = useContext(CartContext)


    const handleCardClick = () => {
        navigate(`/products/${_id}`)
    }

    return (
        <Grid>
            <Card
                onClick={handleCardClick}
                sx={{
                    width: { xs: '100%', sm: 550 },
                    maxWidth: 300,
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
                    height="150"
                    image={image}
                    alt={`${productTitle} image`}
                    sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16, objectPosition: "center" }}
                />
                <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        {productTitle}
                    </Typography>
                    <Box
                        component="hr"
                    ></Box>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        <Box component="span" fontWeight="bold">Price: {price}€</Box>
                    </Typography>

                </CardContent>
                <CardActions>
                    <Link to={`/product-details/${_id}`}>
                        <Button>
                            Details
                        </Button>
                    </Link>
                    <IconButton size="small" onClick={(e) => {
                        e.stopPropagation();
                        addItem({_id, productTitle, price});
                        }}>
                        <ShoppingCartIcon sx={{ color: "#122415" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}