import styles from './Employees.module.css';
import NewEmployee from "./NewEmployee";
import {EmployeeTypes} from "../../models/Types";
import EmployeeCard from "./EmployeeCard";
import Loading from "../../Portal/Loading";


export default function Employees(
    props: { employees: EmployeeTypes[], loadingScreen: any }
) {
    return (
        <div className={styles.employees}>
            <div>
                <h1>Dostęp tylko dla szefa!</h1>
                <h3>Lista pracowników</h3>
                <ul>
                    {props.employees.map(emp => (
                        <EmployeeCard key={emp._id}
                                      employee={emp}
                                      loadingScreen={props.loadingScreen}

                        />
                        ))}
                </ul>
                <NewEmployee loadingScreen={props.loadingScreen}/>
            </div>
        </div>
    )
}