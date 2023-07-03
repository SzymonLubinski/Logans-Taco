import clientPromise from "../../components/lib/mongodb";
import {WithId, Document} from "mongodb";
import Main from "../../components/Main/Main";
import OrderContextProvider from "./context/context";
import styles from './page.module.css';

export default async function Page() {
    const mongoClient = await clientPromise;
    await mongoClient.connect();

    const meals: WithId<Document>[] = await mongoClient
        .db('logans-taco')
        .collection('meals')
        .find()
        .toArray();

    const users: WithId<Document>[] = await mongoClient
        .db('users')
        .collection('User')
        .find({'rating': {$exists: true}})
        .toArray();

    let ratings = [];
    for (let user of users){
        if (user.rating){
            ratings.push(user.rating);
        }
    }

    const data = JSON.parse(JSON.stringify(meals))
    return (
        <div className={styles.font}>
            <OrderContextProvider>
                <Main meals={data} ratings={ratings}/>
            </OrderContextProvider>
        </div>
    )
}

