import {useState} from "react";
import styles from "./AD.module.css";
import Navi from "./Navi";
import AdminOrders from "../AdminOrders/AdminOrders";
import Welcome from "../Welcome/Welcome";
import Employees from "../Employees/Employees";
import FirmsData from "../Data/FirmsData";
import {AllDataTypes} from "../../models/Types";

export default function AdminDashboard(props: {data: AllDataTypes}) {
    const [activeTab, setActiveTab] = useState('orders');

    const changeTabHandler = (newTav: string) => {
        setActiveTab(newTav);
    }
    return (
        <div className={styles.admin}>
            <div className={styles.nav}>
                <Navi OnChangeTab={changeTabHandler}/>
            </div>
            <div className={styles.dashboard}>
                {activeTab === 'welcome' && <Welcome/>}
                {activeTab === 'orders' && <AdminOrders orders={props.data.ordersData}/>}
                {activeTab === 'employees' && <Employees employees={props.data.employeesData}/>}
                {activeTab === 'data' && <FirmsData firmsData={props.data}/>}
            </div>
        </div>
    )
}