import React from "react";
import styles from './OrderItem.module.css';
import {OrderItemTypes} from "../models/Types";


export default function OrderItem (props: OrderItemTypes) {
    return (
        <li className={styles.item} key={props.id}>
            <div className={styles.left}>
                <div>
                    <button onClick={props.addOrder}>+</button>
                    <button onClick={props.removeOrder}>-</button>
                </div>
                <p>{props.name}</p>
            </div>
            <div className={styles.right}>
                <p>{props.price} zł</p>
                <div >x{props.amount}</div>
            </div>
        </li>
    )
}