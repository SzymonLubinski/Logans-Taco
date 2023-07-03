import ProductsPie from "./ProductCharts/ProductsPie";
import OrdersCharts from "./RevenueCharts/OrdersCharts";
import {useState} from "react";
import {AllDataTypes} from "../../models/Types";
import styles from './FD.module.css';
import EmployeesData from "./EmployeesCharts/EmployeesData";
import Tabs from "./Tabs";


function FirmsData(props: { firmsData: AllDataTypes }) {
    const [whichTab, setWhichTab] = useState('products');
    const switchChartHandler = (which: string) => {
        setWhichTab(which);
    }
    const tabs = [
        {text: 'Produkty', tab: 'products'},
        {text: 'Przychody', tab: 'revenue'},
        {text: 'Pracownicy', tab: 'employees'}
    ]

    return (
        <div>
            <div>
                <div className={styles.categories}>
                    <h1>Kategorie</h1>
                    <Tabs currTab={whichTab}
                          tabs={tabs}
                          changeTab={switchChartHandler}
                    />
                </div>
                <div className={styles.charts}>
                    {whichTab === 'products' &&
                        <ProductsPie meals={props.firmsData.mealsData}
                                     orders={props.firmsData.ordersData}
                        />
                    }
                    {whichTab === 'revenue' &&
                        <OrdersCharts orders={props.firmsData.ordersData}/>
                    }
                    {whichTab === 'employees' &&
                        <EmployeesData employees={props.firmsData.employeesData}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default FirmsData;
