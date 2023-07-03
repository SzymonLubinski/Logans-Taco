import {NextResponse} from "next/server";
import clientPromise from "../../../../components/lib/mongodb";

export async function POST(request: Request) {
    const data = await request.json()

    const mongoClient = await clientPromise;

    try {
        await mongoClient.connect();
        const db = mongoClient.db('logans-taco');
        const collection = db.collection('employees');
        await collection.insertOne({
            empNick: data.empNick,
            contractType: data.contractType,
            contractStart: data.contractStart,
            contractEnd: data.contractEnd,
            salaryPerHour: data.salaryPerHour,
        })

        console.log('(NEWEMPLOYEE), Success step 2');
    } catch (err) {
        console.log(err);
        console.log('(NEWEMPLOYEE), we have a bug step 2');
    } finally {
        await mongoClient.close();
    }
    return NextResponse.json({data});
}