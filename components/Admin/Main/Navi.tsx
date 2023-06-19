import styles from './Navi.module.css';
import Image from "next/image";
import {NaviType} from "../../models/Types";


const userImage = require('../../../public/user-solid.svg').default;
const OrdersImage = require('../../../public/table-list-solid.svg').default;
const EmployeesImage = require('../../../public/user-group-solid.svg').default;
const DataImage = require('../../../public/think-peaks.svg').default;


export default function Navi (props: NaviType) {

    return (
        <div className={styles.navi}>
            <div className={styles.title}>
                <h3>Admin #1</h3>
            </div>
            <div className={styles.links}>
                <a href='#'>
                    <div onClick={props.OnChangeTab.bind(null, 'welcome')}>
                        <Image className={styles.img} src={userImage} alt='user'/>
                        <p>Welcome</p>
                    </div>
                </a>
                <a href='#'>
                    <div onClick={props.OnChangeTab.bind(null, 'orders')}>
                        <Image className={styles.img} src={OrdersImage} alt='user'/>
                        <p>Orders</p>
                    </div>
                </a>
                <a href='#'>
                    <div onClick={props.OnChangeTab.bind(null, 'employees')}>
                        <Image className={styles.img} src={EmployeesImage} alt='user'/>
                        <p>Employees</p>
                    </div>
                </a>
                <a href='#'>
                    <div onClick={props.OnChangeTab.bind(null, 'data')}>
                        <Image className={styles.img} src={DataImage} alt='user'/>
                        <p>Data</p>
                    </div>
                </a>
            </div>
        </div>
    )
}