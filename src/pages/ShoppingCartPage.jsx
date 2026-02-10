import { Container, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button, Link, } from '@mui/material';
import { CartContext } from "../context/cart.context";
import { useContext } from "react";


export default function ShoppingCartPage() {
    const { shoppingCart } = useContext(CartContext)

    return (
        <>
            <Container maxWidth="md">
                <Box sx={{ mt: 4, minHeight: 650 }}>
                    <Typography>Shopping Cart</Typography>
                    {shoppingCart.length === 0
                        ? (<Typography>No items to show</Typography>)
                        : (
                            <List>
                                {shoppingCart.map((item) => {
                                    return (
                                        <>
                                        <ListItemText
                                            primary={item.productTitle}
                                            secondary={`${item.price}€ - pcs:${item.quantity}`}
                                        >
                                        </ListItemText>

                                        </>
                                    )
                                })}
                            </List>)}
                </Box>
            </Container>
        </>
    )
}