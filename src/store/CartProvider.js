import React, { useReducer } from "react";
import CartContext from "./cart-context";
const defaulState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            {
                const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;

                const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
                const existingItem = state.items[existingItemIndex];

                let updatedItems;
                if (existingItem) {
                    const updatedItem = {
                        ...existingItem,
                        amount: existingItem.amount + action.item.amount
                    };

                    updatedItems = [...state.items];
                    updatedItems[existingItemIndex] = updatedItem;
                } else {
                    updatedItems = state.items.concat(action.item);
                }

                return {
                    items: updatedItems,
                    totalAmount: updatedTotalAmount
                }
            }

        case 'REMOVE':
            {
                const existingItemIndex = state.items.findIndex(item => item.id === action.id);
                const existingItem = state.items[existingItemIndex];
                const updatedTotalAmount = state.totalAmount - existingItem.price;
                let updatedItems;
                if (existingItem.amount === 1) {
                    updatedItems = state.items.filter(item => item.id !== action.id)
                } else {
                    const updatedItem = {
                        ...existingItem,
                        amount: existingItem.amount - 1
                    };
                    updatedItems = [...state.items];
                    updatedItems[existingItemIndex] = updatedItem;
                }
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
        dispatch({ type: 'REMOVE', id: id })
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