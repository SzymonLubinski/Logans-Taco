import {useState} from "react";
import AllEmployeesCharts from "./AllEmployeesCharts";
import {EmployeeTypes} from "../../../models/Types";
import styles from "./ED.module.css";
import Tabs from "../Tabs";
import OneEmpCharts from "./OneEmpCharts";


export default function EmployeesData(
    props: { employees: EmployeeTypes[] }
) {
    const [whichTab, setWhichTab] = useState('all');

    const switchTabHandler = (which: string) => {
        setWhichTab(which);
    }
    const tabs = [
        {
            text: 'Wszystkie',
            tab: 'all',
        }
    ];
    for (let emp of props.employees){
        tabs.push({
            text: emp.empNick,
            tab: emp.empNick,
        })
    }

    function getCurrentEmployee(){
        let curEmp = props.employees[0];
        for (let emp of props.employees){
            if (emp.empNick === whichTab){
                curEmp = emp
            }
        }
        return curEmp;
    }

    return (
        <div className={styles.emp}>
            <Tabs currTab={whichTab}
                  tabs={tabs}
                  changeTab={switchTabHandler}
            />
            {whichTab === 'all' &&
                <AllEmployeesCharts employees={props.employees}/>
            }
            {whichTab !== 'all' &&
                <OneEmpCharts employee={getCurrentEmployee()}/>
            }
        </div>
    )
}