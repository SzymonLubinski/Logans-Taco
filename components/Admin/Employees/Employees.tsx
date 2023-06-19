import styles from './Employees.module.css';
import NewEmployee from "./NewEmployee";
import {EmployeeTypes} from "../../models/Types";


export default function Employees(props: {employees: EmployeeTypes[]}) {
    return (
        <div className={styles.employees}>
            <div>
                <h1>Dostęp tylko dla szefa!</h1>
                <h3>Lista pracowników</h3>
                <ul>
                    {props.employees.map(emp => (
                        <li key={emp._id}>
                            <h3>{emp.employeeName}, Umowa od: {emp.contractStarts}</h3>
                        </li>
                    ))}
                </ul>
                <NewEmployee/>
            </div>
        </div>
    )
}