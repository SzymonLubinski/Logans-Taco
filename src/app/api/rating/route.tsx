import {NextResponse} from "next/server";
import clientPromise from "../../../../components/lib/mongodb";


export async function POST(request: Request) {
    const body = await request.json()
    const {userEmail, rating} = body;
    const mongoClient = await clientPromise;
    await mongoClient.connect();
    try {
        await mongoClient
            .db('users')
            .collection('User')
            .findOneAndUpdate(
                {'email': userEmail},
                {$set: {'rating': rating}}
            )

        console.log('(RATING), Success step 2');
    } catch (err) {
        console.log(err);
        console.log('(RATING), we have a bug step 2');
    } finally {
        await mongoClient.close();
    }
    return NextResponse.json({body});
}