    import React, { useState, useEffect } from "react";

    const CartContext = React.createContext();

    function CartProviderWrapper (props) {
        const [shoppingCart, setShoppingCart] = useState([]);

        const addItem = (item) => {

            setShoppingCart((prevCart) => {
                const itemExists = prevCart.find(cartItem => cartItem._id === item._id)

                if (itemExists) {
                    return prevCart.map((cartItem) => {
                        if (cartItem._id === item._id) {
                            return ({...cartItem, quantity: cartItem.quantity + 1 })
                        } else {
                            return cartItem
                        }
                    })
                } else {
                    return ([...prevCart, {...item, quantity: 1}])
                }
            });
      
        };

        useEffect(() => {
            console.log("Cart updated:", shoppingCart)
        }, [shoppingCart])

        return (
            <CartContext.Provider value={{shoppingCart, addItem}}>
                {props.children}
            </CartContext.Provider>
        )
    }

    export {CartProviderWrapper, CartContext}