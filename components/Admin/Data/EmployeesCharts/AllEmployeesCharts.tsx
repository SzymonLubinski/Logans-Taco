import {Bar} from "react-chartjs-2";
import {EmployeeTypes} from "../../../models/Types";
import {RandomColor} from "../../../models/RandomColor";
import {ChartBarSettings} from "../../../models/ChartBarSettings";
import {BusinessDayOfYear} from "../../../models/BusinessDayOfYear";
import dayjs from 'dayjs';
import dayjsBusinessDays from 'dayjs-business-days2';
import localizedFormat  from 'dayjs/plugin/localizedFormat';
import localeData  from 'dayjs/plugin/localeData';
import * as pl from 'dayjs/locale/pl'

dayjs.extend(dayjsBusinessDays);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.locale(pl);


export default function AllEmployeesCharts(
    props: { employees: EmployeeTypes[] }
) {

    const chartColor = new RandomColor(props.employees.length).getColor();

    const titleDaysWorking = 'ile dni pracują nasi pracownicy w 2023';
    const daysWorking = new BusinessDayOfYear().getManyEmployeeDaysOfWork(props.employees)
    const workDaysChartSettings = new ChartBarSettings(daysWorking, chartColor, titleDaysWorking);
    const workDaysOptions = workDaysChartSettings.getBarOptions();
    const workDaysData = workDaysChartSettings.getBarData();

    const titleEmployeesCost = 'ile kosztują nas nasi pracownicy w 2023';
    const employeesCost = new BusinessDayOfYear().getManyEmployeeDaysOfWork(props.employees, true)
    const employeesCostChartSettings = new ChartBarSettings(employeesCost, chartColor, titleEmployeesCost);
    const employeesCostOptions = employeesCostChartSettings.getBarOptions();
    const employeesCostData = employeesCostChartSettings.getBarData();


    return (
        <>
            <Bar options={workDaysOptions} data={workDaysData}/>
            <Bar options={employeesCostOptions} data={employeesCostData}/>
        </>
    )
}