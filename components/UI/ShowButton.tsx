"use client";
import styles from './ShowButton.module.css';
import Image from "next/image";
import {ButtonProps} from "../models/Types";


export default function ShowButton (props: ButtonProps) {
    const btnClickHandler = () => {
        if (props.onShowOrder){
            props.onShowOrder();
        }
        if (props.onShowMenu){
            props.onShowMenu();
        }
    }

    return (
        <button onClick={btnClickHandler} className={styles.btn}>
            <Image className={styles.icon} src={props.image} alt='koszyk zamówień'/>
        </button>
    )
}