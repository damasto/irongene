import { Container, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button, Link, IconButton } from '@mui/material';
import { CartContext } from "../context/cart.context";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";


export default function ShoppingCartPage() {
    const { shoppingCart, removeItem } = useContext(CartContext)

    return (
        <>
            <Container maxWidth="md">
                <Box sx={{ mt: 4, minHeight: 650, }}>
                    <Typography>Your Shopping Cart</Typography>
                    {shoppingCart.length === 0
                        ? (<Typography>No items to show</Typography>)
                        : (
                            <List sx={{
                                width: '100%',
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                border: "1px solid black"
                            }}>
                                {shoppingCart.map((item) => {
                                    return (
                                        <>
                                            <ListItem sx={{
                                                py: 2,
                                                px: 2,
                                                alignItems: 'flex-start',
                                            }}
                                                key={item.title}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{
                                                            width: 72,
                                                            height: 72,
                                                            mr: 2,
                                                        }}
                                                    />
                                                </ListItemAvatar>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            lineHeight: 1.2,
                                                        }}
                                                    >{item.productTitle}</Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            px: 1,
                                                            alignItems: "flex-end",
                                                            border: "1px solid",
                                                            borderColor: "divider",
                                                            borderRadius: 2,
                                                            width: "fit-content",
                                                        }}
                                                    >
                                                        <Typography>Quantity: {item.quantity}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-end",
                                                    gap: 1
                                                }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: 700,
                                                        }}
                                                        color="primary"
                                                    >{item.price}€</Typography>
                                                    <IconButton color="error" size="small" onClick={() => removeItem(item)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </ListItem>
                                            <Divider component="li" />


                                        </>
                                    )
                                })}
                            </List>)}
                </Box>
            </Container>
        </>
    )
}