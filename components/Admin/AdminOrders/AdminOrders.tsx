import AdminOrder from "./AdminOrder";
import styles from './AdminOrders.module.css';
import {AdminOrderTypes} from "../../models/Types";


export default function AdminOrders(
    props: {orders: AdminOrderTypes[], loadingScreen: () => void}
){
    return (
        <div className={styles.main}>
            <div className={styles.welcome}>
                <p>Aktywne zamówienia</p>
            </div>
            <ul>
                {props.orders.map((order) => (
                    <AdminOrder key={order._id}
                                order={order}
                                loadingScreen={props.loadingScreen}
                    />
                ))}
            </ul>
        </div>
    )
}