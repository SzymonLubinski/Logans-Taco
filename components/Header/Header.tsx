"use client";

import Image from "next/image";
import styles from './Header.module.css';
import Button from "../UI/Button";
import {HeaderTypes} from "../models/Types";


const logo = require('../../public/tacoLogo.png').default;
const basket = require('../../public/koszyk.png').default;
const toggle = require('../../public/toggle.svg').default;


export default function Header (props: HeaderTypes) {
    return (
        <header className={styles.header}>
            <div>
                <Button image={toggle} onShowMenu={props.onShowMenu}/>
            </div>
            <div className={styles.title}>
                <h1>Logan's</h1>
                <Image className={styles.logo} src={logo} alt="logo Logan's Taco"/>
                <h1>Taco</h1>
            </div>
            <div>
                <Button image={basket} onShowOrder={props.onShowOrder}/>
            </div>
        </header>
    )
}