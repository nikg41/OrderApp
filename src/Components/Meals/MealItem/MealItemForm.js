import React, { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const inputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault()

        const enteredAmount = inputRef.current.value;
        const enteredNumberAmount = +enteredAmount;
        if (enteredNumberAmount === 0 ||
            enteredNumberAmount < 1 ||
            enteredNumberAmount > 5) {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredNumberAmount);
    }

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input
            ref={inputRef}
            label='Amount'
            input={{
                id: 'amount_' + props.id, // this changed!
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            }}
        />
        {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
        <button>+ Add</button>
    </form>
}

export default MealItemForm;