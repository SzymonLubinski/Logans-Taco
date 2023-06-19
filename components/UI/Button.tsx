"use client";
import {useState} from "react";
import styles from './Button.module.css';
import Image from "next/image";
import {ButtonProps} from "../models/Types";


export default function Button (props: ButtonProps) {
    const [btnAction, setBtnAction] = useState(false);
    const btnStyles = `${styles.button} ${btnAction ? styles.bump : ""}`

    const btnClickHandler = () => {
        if (props.onShowOrder){
            props.onShowOrder();
        }
        if (props.onShowMenu){
            props.onShowMenu();
        }
        setBtnAction(true);
        const timer = setTimeout(() => {
            setBtnAction(false);
        }, 300);
        return () => {clearTimeout(timer)};
    }

    return (
        <button onClick={btnClickHandler} className={btnStyles}>
            <Image className={styles.icon} src={props.image} alt='koszyk zamówień'/>
        </button>
    )
}