import React, { useState, useEffect } from "react";

const CartContext = React.createContext();

function CartProviderWrapper(props) {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [counter, setCounter] = useState(1)
    const [itemCounter, setItemCounter] = useState(null);

    const addItem = (item) => {

        setShoppingCart((prevCart) => {
            const itemExists = prevCart.find(cartItem => cartItem._id === item._id)

            if (itemExists) {
                return prevCart.map((cartItem) => {
                    if (cartItem._id === item._id) {
                        return ({ ...cartItem, quantity: cartItem.quantity + counter })
                    } else {
                        return cartItem
                    }
                })
            } else {
                return ([...prevCart, { ...item, quantity: counter }])
            }
        });



        setCounter(1);

    };

    const increaseAmount = (setItem, item) => {
        setItem(item + 1);
    }

    const decreaseAmount = (setItem, item) => {
        if (item > 1) {
            setItem(item - 1)
        }
    }

    const countCartItems = () => {
        if (shoppingCart.length > 0) {
            const totalItems = shoppingCart.reduce((acc, item) => {
                return acc + item.quantity
            }, 0)

            setItemCounter(totalItems)
        }
    }

    useEffect(() => {
       
        countCartItems();

        console.log("Cart updated:", shoppingCart)
    }, [shoppingCart])

    return (
        <CartContext.Provider value={{ shoppingCart, addItem, counter, setCounter, increaseAmount, decreaseAmount, itemCounter }}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartProviderWrapper, CartContext }