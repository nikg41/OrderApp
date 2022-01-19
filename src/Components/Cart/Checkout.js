import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })

    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const isEmpty = value => value.trim() === '';
    const isFiveChars = value => value.trim().length === 5;

    const confirmHandler = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const street = streetRef.current.value;
        const postal = postalRef.current.value;
        const city = cityRef.current.value;

        const nameValid = !isEmpty(name);
        const streetValid = !isEmpty(street);
        const cityValid = !isEmpty(city);
        const postalValid = isFiveChars(postal);

        setFormValidity({
            name: nameValid,
            street: streetValid,
            city: cityValid,
            postal: postalValid
        })

        const formValid = nameValid && streetValid && cityValid && postalValid;
        if (!formValid) {
            return
        }

        props.onConfirm({
            name: name,
            street: street,
            city: city,
            postal: postal
        })
    };

    const nameClasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
    const streetClasses = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;
    const postalClasses = `${classes.control} ${formValidity.postal ? '' : classes.invalid}`;
    const cityClasses = `${classes.control} ${formValidity.city ? '' : classes.invalid}`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef} />
                {!formValidity.name && <p className={classes["error-text"]} >Please enter a valid name!</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef} />
                {!formValidity.street && <p className={classes["error-text"]}>Please Enter a valid street!</p>}
            </div>
            <div className={postalClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalRef} />
                {!formValidity.postal && <p className={classes["error-text"]}>Please Enter a valid postal code (5 characters long)!</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef} />
                {!formValidity.city && <p className={classes["error-text"]}>Please Enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;