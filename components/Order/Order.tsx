import React, {useContext, useState} from "react";
import {OrderContext} from "../context/context";
import styles from './Order.module.css';
import OrderItem from "./OrderItem";
import Summary from "./Summary";
import {Portal} from "../Portal/Portal";
import {BackdropType, ItemTypes} from "../models/Types";
import CloseButton from "../UI/CloseButton";


export default function Order(props:BackdropType) {
    const ctx = useContext(OrderContext);
    const addItemHandler = (item: ItemTypes) => {
        ctx.addOrder({...item, amount: 1});
    }

    let deliveryCosts = 8;
    const delivery = ctx.freeDelivery ?
        <div className={styles.freeDelivery}>
            Darmowa Dostawa!
        </div>
        :
        <div className={styles.delivery}>
            Koszt dostawy: {deliveryCosts} zł
        </div>
    ;

    const [summary, setSummary] = useState(false);
    const visibleSummaryHandler = () => {
        if (summary) {
            setSummary(false);
        } else {
            setSummary(true);
        }
    }

    return (
            <Portal onClose={props.onClose}>
                <div className={styles.orderTable}>
                    <h1>Twoje Zamówienie!</h1>
                    <div className={styles.aboveList}>Lista wybranych dań:</div>
                    <ul>
                        {ctx.items.map(item => (
                            <OrderItem key={item.id}
                                       id={item.id}
                                       name={item.name}
                                       amount={item.amount}
                                       price={item.price}
                                       removeOrder={ctx.removeOrder.bind(null, item.name)}
                                       addOrder={addItemHandler.bind(null, item)}
                            />
                        ))}
                    </ul>
                    {ctx.items.length > 0 &&
                        <div className={styles.underList}>
                            <div className={styles.summary}>
                                {delivery}
                                <p>Łączna kwota</p>
                                <p>
                                    {ctx.freeDelivery ?
                                        ctx.totalAmount.toFixed(2) :
                                        (ctx.totalAmount + deliveryCosts).toFixed(2)} zł
                                </p>
                            </div>
                            <div>
                                <button className={styles.submitOrder}
                                        onClick={visibleSummaryHandler}
                                        type='submit'
                                >
                                    <span>Szczegóły zamówienia</span>
                                </button>
                            </div>
                        </div>
                    }

                    {
                        summary && ctx.items.length !== 0
                        && <Summary onShow={props.onShow}/>
                    }
                    <CloseButton onClose={props.onClose}/>
                </div>
            </Portal>
    )
}