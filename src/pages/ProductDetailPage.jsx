import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Grid,
  CardActions,

} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CartContext } from '../context/cart.context';


export default function ProductDetailPage() {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null);
  const {addItem, counter, setCounter, decreaseAmount, increaseAmount} = useContext(CartContext)
  const { productId } = useParams();
  const { productTitle, price, _id, description } = product || {};
  const image = `/images/${_id}.png`

  const getProduct = async () => {
    try {
      const res = await api.get(`api/products/${productId}`);
      setProduct(res.data);
    } catch (err) {
      setError(err.message)
      console.error("Could not fetch product:", err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProduct();
  }, [])

  if (loading) return <div>Loading…</div>;
  if (error) return <Typography variant="body2" color='error'>Ooops we could not get this product, try again later</Typography>;


  return (
    product && (
      <Box
        margin="5%"
      >
        <Grid
          container
          justifyContent="center"
        >
          <Card
            sx={{
              width: { xs: '100%', sm: 550 },
              maxWidth: 500,
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
              <Typography variant="body2" sx={{ mb: 2 }}>
                {description}
              </Typography>
              <Box
                component="span"
                fontWeight="bold"

                sx={{display:"flex", justifyContent: "space-between", alignItems: "center"}}
              >
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Price: {price}€
                </Typography>
                <CardActions>
                  <IconButton onClick={() => decreaseAmount(setCounter, counter)}>
                    <RemoveCircleOutlineIcon/>
                  </IconButton>
                  <Box>{counter}</Box>
                  <IconButton onClick={() => increaseAmount(setCounter, counter)}>
                    <AddCircleOutlineIcon/>
                  </IconButton>
                  <IconButton onClick={() => addItem({_id, productTitle, price})} color="inherit" >
                    <ShoppingCartIcon/>
                  </IconButton>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    )
  );
}