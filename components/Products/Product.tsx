"use client";

import React, {useRef, useContext} from "react";
import {OrderContext} from "../context/context";
import Image from "next/image";
import styles from './Product.module.css';
import Input from "../UI/Input";
import Tilt from './Tilt';
import {MealType} from "../models/Types";


export default function Product(props: MealType) {
    const ctx = useContext(OrderContext);
    const amountInputRef = useRef<HTMLInputElement>(null);

    async function addToOrder(event: React.SyntheticEvent) {
        event.preventDefault();
        const amount = Number(amountInputRef.current!.value);
        ctx.addOrder({
            id: props._id,
            amount: amount,
            price: props.price,
            name: props.name,
        });
    }
    const src = props.image;


    const options = {
        max: 25,
        speed: 400,
    }

    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <Tilt options={options}>
                    <div className={styles.box}>
                        <h2 className={styles.title}>{props.name}</h2>
                        <div className={styles.circle}></div>
                        <Image className={styles.product}
                               loader={() => src}
                               unoptimized
                               src={src}
                               width={0}
                               height={0}
                               alt='pyszne danie'
                        />
                    </div>
                </Tilt>
            </div>
            <div className={styles.cardDescription}>
                <div className={styles.info}>
                    <p>{props.ingredients}</p>
                    <p>{props.price} zł</p>
                </div>
                <form onSubmit={addToOrder} className={styles.form}>
                    <Input ref={amountInputRef}/>
                    <button className={styles.btn} type='submit'>Dodaj</button>
                </form>
            </div>
        </div>
    )
}