import {NextResponse} from "next/server";
import clientPromise from "../../../../components/lib/mongodb";
const mongodb = require('mongodb');

export async function POST(request: Request) {
    const body = await request.json()
    const mongoClient = await clientPromise;
    try {
        await mongoClient.connect();
        const db = mongoClient.db('logans-taco');
        if (body.action === 'remove-order'){
            const collection = db.collection('orders');
            await collection.deleteOne({'_id': new mongodb.ObjectId(body.load)})
        }
        if (body.action === 'remove-employee'){
            const collection = db.collection('employees');
            await collection.deleteOne({'_id': new mongodb.ObjectId(body.load)})
        }
        console.log('(REMOVE), Success step 2');
    } catch (err) {
        console.log(err);
        console.log('(REMOVE), we have a bug step 2');
    } finally {
        await mongoClient.close();
    }
    return NextResponse.json({body});
}