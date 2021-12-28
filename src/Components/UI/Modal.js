import React, { Fragment } from "react";
import styles from "./Modal.module.css";
import reactDom from "react-dom";
const Backdrop = props => {
    return <div className={styles.backdrop} />
}

const ModalOverlay = props => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal = props => {
    return <Fragment>
        {reactDom.createPortal(<Backdrop />, portalElement)}
        {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}

export default Modal;