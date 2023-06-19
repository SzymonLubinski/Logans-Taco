import AdminOrder from "./AdminOrder";
import styles from './AdminOrders.module.css';
import {AdminOrderTypes} from "../../models/Types";

export default function AdminOrders(props: {orders: AdminOrderTypes[]}){
    return (
        <div className={styles.main}>
            <div className={styles.welcome}>
                <p>Aktywne zamówienia</p>
            </div>
            <ul>
                {props.orders.map((order) => (
                    <AdminOrder key={order._id}
                                _id={order._id}
                                contact={order.contact}
                                freeDelivery={order.freeDelivery}
                                isSent={order.isSent}
                                meals={order.meals}
                                totalAmount={order.totalAmount}/>
                ))}
            </ul>
        </div>
    )
}