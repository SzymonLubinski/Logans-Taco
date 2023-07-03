import styles from './Navi.module.css';
import Image from "next/image";
import {NaviType} from "../../models/Types";
import Tabs from "../Data/Tabs";
import {useState} from "react";


const userImage = require('../../../public/user-solid.svg').default;
const OrdersImage = require('../../../public/table-list-solid.svg').default;
const EmployeesImage = require('../../../public/user-group-solid.svg').default;
const DataImage = require('../../../public/think-peaks.svg').default;


export default function Navi(props: NaviType) {
    const [activeTab, setActiveTab] = useState('Welcome');
    const activeTabHandler = (tab: string) => {
        setActiveTab(tab);
        props.OnChangeTab(tab);
    }

    const tabs = [
        {tab: 'Welcome', image: userImage.src},
        {tab: 'Orders', image: OrdersImage.src},
        {tab: 'Employees', image: EmployeesImage.src},
        {tab: 'Data', image: DataImage.src},
    ];

    const listItems = () => {
        const checkActivity = (tab: string) => {
            if (activeTab === tab) {
                return `${styles.active}`;
            } else {
                return '';
            }
        }
        return (
            <ul>
                {tabs.map((elVal) => (
                    <li onClick={activeTabHandler.bind(null, elVal.tab)}
                        key={elVal.tab}
                        className={checkActivity(elVal.tab)}
                    >
                        <Image className={styles.img}
                               src={elVal.image}
                               alt={elVal.tab}
                               width={50}
                               height={50}
                        />
                        <p>{elVal.tab}</p>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className={styles.navi}>
            <div className={styles.title}>
                <h3>Admin #1</h3>
            </div>
            <div className={styles.links}>
                {listItems()}
            </div>
        </div>
    )
}