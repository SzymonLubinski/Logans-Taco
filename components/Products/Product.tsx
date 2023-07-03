"use client";

import React, {useRef, useContext, useState} from "react";
import {OrderContext} from "@/app/context/context";
import Image from "next/image";
import styles from './Product.module.css';
import Input from "../UI/Input";
import Tilt from './Tilt';
import {MealType} from "../models/Types";
import SimpleButton from "../UI/SimpleButton";


class AnimatedObjects {
    public addObject (amount: number){
        return (
            <span className={styles.addAnimation}>
                +{amount}
            </span>
        )
    }
}


export default function Product(props: MealType) {
    const [animatedObjects, setAnimatedObjects] = useState<never[] | any[]>([]);
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

        let obj = new AnimatedObjects().addObject(Number(amountInputRef.current!.value))

        setAnimatedObjects(prev => [...prev, obj]);
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
                    {animatedObjects.map((amount: number, i) => {
                        return (
                            <span key={i} className={styles.addAnimation}>
                                {amount}
                            </span>
                        )
                    })}
                    <Input ref={amountInputRef}/>
                    <SimpleButton/>
                </form>
            </div>
        </div>
    )
}