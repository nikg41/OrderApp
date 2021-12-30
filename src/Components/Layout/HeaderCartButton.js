import React, { useContext, useEffect, useState } from 'react';
import styles from "./HeaderCartButton.module.css";
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const { items } = cartCtx;
    const noOfCartItems = items.reduce((curNumber, item) => { return curNumber + item.amount }, 0);


    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        setBtnHighlighted(true);

        const timer = setInterval(() => {
            setBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    }, [items]);
    const btnClasses = `${styles.button} ${btnHighlighted ? styles.bump : ''}`;

    return <button className={btnClasses} onClick={props.onShowCart}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={styles.badge}>
            {noOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;