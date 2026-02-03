    import React, { useState, useEffect } from "react";

    const CartContext = React.createContext();

    function CartProviderWrapper (props) {
        const [shoppingCart, setShoppingCart] = useState([]);
        const [counter, setCounter] = useState(1)

        const addItem = (item) => {

            setShoppingCart((prevCart) => {
                const itemExists = prevCart.find(cartItem => cartItem._id === item._id)

                if (itemExists) {
                    return prevCart.map((cartItem) => {
                        if (cartItem._id === item._id) {
                            return ({...cartItem, quantity: cartItem.quantity + counter })
                        } else {
                            return cartItem
                        }
                    })
                } else {
                    return ([...prevCart, {...item, quantity: counter}])
                }
            });

            setCounter(1);
      
        };

        const increaseAmount = () => {
            setCounter(counter + 1);
        }

        const decreaseAmount = () => {
            setCounter(counter - 1)
        }

        useEffect(() => {
            console.log("Cart updated:", shoppingCart)
        }, [shoppingCart])

        return (
            <CartContext.Provider value={{shoppingCart, addItem, counter, increaseAmount, decreaseAmount}}>
                {props.children}
            </CartContext.Provider>
        )
    }

    export {CartProviderWrapper, CartContext}