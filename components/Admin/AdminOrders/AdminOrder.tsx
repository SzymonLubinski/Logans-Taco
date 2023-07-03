import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import dayjs from "dayjs";
import styles from './AdminOrder.module.css';
import {AdminOrderTypes,FulfillmentType} from "../../models/Types";


export default function AdminOrder (
    props: {order: AdminOrderTypes, loadingScreen: () => void}
) {
    const orderDate = dayjs(props.order.date).format('lll');
    const router = useRouter();
    const {register, formState: {errors}, handleSubmit} = useForm<FulfillmentType>({
        mode: "onChange"
    });

    const onRemoveOrder: SubmitHandler<FulfillmentType> = async (data: Object, e: any)=> {
        props.loadingScreen();
        e.preventDefault();
        const response = await fetch('/api/remove-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({action: 'remove-order', load: props.order._id}),
        });
        if (response.ok) {
            console.log('(NEWEMPLOYEE), successfully step 1!');
            router.refresh();

        }
        if (!response.ok) {
            console.log('(NEWEMPLOYEE), we have a bug step 1');
        }
    }

    return (
        <li className={styles.card}>
            <h4>Id: {props.order._id}</h4>
            <h4>{orderDate}</h4>
            <div className={styles.content}>
                <ul>
                    {props.order.meals.map((meal) => (
                        <li key={meal.name}>
                            <p className={styles.name}> {meal.name}</p>
                            <p>ilość sztuk: {meal.amount}</p>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit(onRemoveOrder)}>
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