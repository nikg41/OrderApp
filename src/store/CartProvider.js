import React from "react";
import CartContext from "./cart-context";

const CartProvider = props => {

    const cartItemAddHandler = (item) => {

    };

    const cartItemRemoveHandler = (id) => {

    };

    const cartContext = {
        items: [],
        maount: 0,
        addItem: cartItemAddHandler,
        removeItem: cartItemRemoveHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;