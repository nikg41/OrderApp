import React, { useReducer } from "react";
import CartContext from "./cart-context";
const defaulState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            const updatedItems = state.items.concat(action.item);
            const updatedTotalAmount = state.totalAmount + action.tem.amount * action.item.price;
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
        default:
            return defaulState;
    }


}

const CartProvider = props => {

    const [cartState, dispatch] = useReducer(cartReducer, defaulState);

    const cartItemAddHandler = (item) => {
        dispatch({ type: 'ADD', item: item })
    };

    const cartItemRemoveHandler = (id) => {

    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: cartItemAddHandler,
        removeItem: cartItemRemoveHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;