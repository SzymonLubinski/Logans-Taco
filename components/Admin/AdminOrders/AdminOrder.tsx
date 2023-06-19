import {SubmitHandler, useForm} from "react-hook-form";
import React from "react";
import styles from './AdminOrder.module.css';
import {AdminOrderTypes,FulfillmentType} from "../../models/Types";


export default function AdminOrder (order: AdminOrderTypes) {
    const {register, formState: {errors}, handleSubmit} = useForm<FulfillmentType>({
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<FulfillmentType> = async (data: Object, e: any)=> {
        e.preventDefault();
        const response = await fetch('/api/order-fulfillment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order._id),
        });
        if (response.ok) {
            console.log('(NEWEMPLOYEE), successfully step 1!')
        }
        if (!response.ok) {
            console.log('(NEWEMPLOYEE), we have a bug step 1')
        }
    }

    return (
        <li className={styles.card}>
            <h4>Id: {order._id}</h4>
            <div className={styles.content}>
                <ul>
                    {order.meals.map((meal) => (
                        <li key={meal.name}>
                            <p className={styles.name}> {meal.name}</p>
                            <p>ilość sztuk: {meal.amount}</p>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>Gotowe</p>
                    <input
                        type="checkbox"
                        required
                        {...register('fulfillment')}
                    />
                    <button type='submit'>Wysłano</button>
                </form>
            </div>
        </li>
    )
}