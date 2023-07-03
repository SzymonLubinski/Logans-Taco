"use client";

import {useState} from "react";
import styles from "./AD.module.css";
import Navi from "./Navi";
import AdminOrders from "../AdminOrders/AdminOrders";
import Welcome from "../Welcome/Welcome";
import Employees from "../Employees/Employees";
import FirmsData from "../Data/FirmsData";
import {AllDataTypes} from "../../models/Types";
import Loading from "../../Portal/Loading";


export default function AdminDashboard(props: {data: AllDataTypes}) {

    const [activeTab, setActiveTab] = useState('Welcome');
    const changeTabHandler = (newTav: string) => {
        setActiveTab(newTav);
    }

    const [isLoading, setIsLoading] = useState(false);
    const loadingHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false)
        }, 2500)
    }

    return (
        <div className={styles.admin}>
            <div className={styles.nav}>
                <Navi OnChangeTab={changeTabHandler}/>
            </div>
            <div className={styles.dashboard}>
                {isLoading && <Loading/>}
                {activeTab === 'Welcome' && <Welcome/>}
                {activeTab === 'Orders' && <AdminOrders orders={props.data.ordersData}
                                                        loadingScreen={loadingHandler}/>}
                {activeTab === 'Employees' && <Employees employees={props.data.employeesData}
                                                         loadingScreen={loadingHandler}/>}
                {activeTab === 'Data' && <FirmsData firmsData={props.data}/>}
            </div>
        </div>
    )
}