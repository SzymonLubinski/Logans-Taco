"use client";

import {useContext, useEffect, useState} from "react";
import styles from './Header.module.css';
import ShowButton from "../UI/ShowButton";
import {HeaderTypes} from "../models/Types";
import Logo from "../Main/Logo";
import {OrderContext} from "@/app/context/context";

const cart = require('../../public/koszyk.png').default;
const toggle = require('../../public/toggle.svg').default;


export default function Header (props: HeaderTypes) {
    const ctx = useContext(OrderContext);
    const numberOfOrders = ctx.items
        .reduce((curNumber, item) => {
            return curNumber + item.amount;
        }, 0);

    const [spanAction, setSpanAction] = useState(false);
    const spanStyles = `${styles.btn} ${spanAction ? styles.bump : ""}`

    useEffect(() => {
        if (ctx.items.length === 0){
            return;
        }
        setSpanAction(true);

        const timer = setTimeout(() => {
            setSpanAction(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [ctx.items])

    return (
        <header className={styles.header}>
            <div>
                <ShowButton image={toggle} onShowMenu={props.onShowMenu}/>
            </div>
            <Logo/>
            <div className={styles.cart}>
                <span className={spanStyles}>{numberOfOrders}</span>
                <ShowButton image={cart} onShowOrder={props.onShowOrder}/>
            </div>
        </header>
    )
}