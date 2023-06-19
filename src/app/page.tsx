import clientPromise from "../../components/lib/mongodb";
import Main from "../../components/Main/Main";
import OrderContextProvider from "../../components/context/context";
import styles from './page.module.css';

export default async function Page() {
    const mongoClient = await clientPromise;
    await mongoClient.connect();

    const meals: any = await mongoClient
        .db('logans-taco')
        .collection('meals')
        .find()
        .toArray();

    const data = JSON.parse(JSON.stringify(meals))
    return (
        <div className={styles.font}>
            <OrderContextProvider>
                <Main meals={data}/>
            </OrderContextProvider>
        </div>
    )
}

