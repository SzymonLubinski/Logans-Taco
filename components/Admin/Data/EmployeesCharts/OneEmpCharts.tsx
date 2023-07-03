import {Bar} from "react-chartjs-2";
import {RandomColor} from "../../../models/RandomColor";
import {EmployeeTypes} from "../../../models/Types";
import dayjs from "dayjs";
import {BusinessDayOfYear} from "../../../models/BusinessDayOfYear";
import {ChartBarSettings} from "../../../models/ChartBarSettings";


export default function OneEmpCharts(
    props: {employee: EmployeeTypes}
) {

    const chartColor = new RandomColor(1).getColor();

    const titleEmployeeDaysOfWork = 'ile pracuje?'
    const daysWorking = new BusinessDayOfYear().getOneEmployeeDaysOfWork(props.employee)
    const workDaysChartSettings = new ChartBarSettings(daysWorking, chartColor, titleEmployeeDaysOfWork);
    const workDaysOptions = workDaysChartSettings.getBarOptions();
    const workDaysData = workDaysChartSettings.getBarData();

    const titleEmployeeCost = 'ile nas kosztuje?'
    const employeeCost = new BusinessDayOfYear().getOneEmployeeDaysOfWork(props.employee, true)
    const employeeCostChartSettings = new ChartBarSettings(employeeCost, chartColor, titleEmployeeCost);
    const employeeCostOptions = employeeCostChartSettings.getBarOptions();
    const employeeCostData = employeeCostChartSettings.getBarData();

    return (
        <>
            <Bar options={workDaysOptions}
                 data={workDaysData}
            />
            <Bar options={employeeCostOptions}
                 data={employeeCostData}
            />
        </>
    )

}