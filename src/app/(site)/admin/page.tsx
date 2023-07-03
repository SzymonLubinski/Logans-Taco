import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "../../../../components/lib/mongodb";
import AdminDashboard from "../../../../components/Admin/Main/AdminDashboard";
import LogOutComponent from "../../../../components/Admin/Main/LogOutComponent";

export default async function Page() {

    const session = await getServerSession(authOptions);
    if (!session){
        return <LogOutComponent/>
    }

    const mongoClient = await clientPromise;
    await mongoClient.connect();

    const mealsData = await mongoClient
        .db('logans-taco')
        .collection('meals')
        .find()
        .toArray();

    const ordersData = await mongoClient
        .db('logans-taco')
        .collection('orders')
        .find()
        .toArray();

    const employeesData = await mongoClient
        .db('logans-taco')
        .collection('employees')
        .find()
        .toArray();

    const allData = {
        mealsData: mealsData,
        ordersData: ordersData,
        employeesData: employeesData,
    }
    const data = JSON.parse(JSON.stringify(allData))

    return (
        <AdminDashboard data={data}/>
    )
}