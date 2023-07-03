import dayjs, {Dayjs} from 'dayjs';
import {MonthsModel} from "./MonthsModel";
import {AddSalaryTypes, EmployeeTypes} from "./Types";

export class BusinessDayOfYear {

    private getMonthsAsObjects() {
        return new MonthsModel().getMonths().reduce((acc: any, curr: any) =>
            (acc[curr] = {}, acc), {});
    }
    private addDaysOfWork(prop: AddSalaryTypes, showSalary: boolean) {
        prop.periods[prop.month][prop.nick] = showSalary ?
            prop.from.businessDiff(prop.to) * 8 * prop.salary :
            prop.from.businessDiff(prop.to);
    }

    private getEmployeeDaysOfWork(employee: EmployeeTypes, periods:any, showSalary = false){
        let contractStart = dayjs(employee.contractStart);
        let contractEnd = dayjs(employee.contractEnd);

        if (contractStart.month() === contractEnd.month()) {
            this.addDaysOfWork({
                periods,
                month: contractStart.month(),
                nick: employee.empNick,
                from: contractEnd,
                to: contractStart,
                salary: employee.salaryPerHour,
            }, showSalary)
        } else {
            // FIRST MONTH
            let lastDayOfMonth = contractStart.lastBusinessDayOfMonth();
            this.addDaysOfWork({
                periods,
                month: contractStart.month(),
                nick: employee.empNick,
                from: lastDayOfMonth,
                to: contractStart,
                salary: employee.salaryPerHour,
            }, showSalary)
            // FIRST MONTH
            // WHOLE MONTHS
            const wholeMonthsOfWork = contractEnd.diff(contractStart, 'months');
            let currentMonth = contractStart.add(1, 'month')
            for (let i = 1; i < wholeMonthsOfWork; i++) {
                let fistDayOfMonth = currentMonth.startOf('month');
                let lastDayOfMonth = currentMonth.endOf('month');
                this.addDaysOfWork({
                    periods,
                    month: currentMonth.month(),
                    nick: employee.empNick,
                    from: lastDayOfMonth,
                    to: fistDayOfMonth,
                    salary: employee.salaryPerHour,
                }, showSalary)
                currentMonth = currentMonth.add(1, 'month')
            }
            // WHOLE MONTHS
            // LAST MONTH
            let fistDayOfMonth = contractEnd.startOf('month');
            this.addDaysOfWork({
                periods,
                month: contractEnd.month(),
                nick: employee.empNick,
                from: contractEnd,
                to: fistDayOfMonth,
                salary: employee.salaryPerHour,
            }, showSalary)
            // LAST MONTH
        }
        return periods;
    }

    public getOneEmployeeDaysOfWork(employee: EmployeeTypes, showSalary = false){
        const periods = this.getMonthsAsObjects();
        this.getEmployeeDaysOfWork(employee, periods, showSalary)
        return periods;
    }
    public getManyEmployeeDaysOfWork(employees: EmployeeTypes[], showSalary = false){
        const periods = this.getMonthsAsObjects();
        for (let emp of employees){
            this.getEmployeeDaysOfWork(emp, periods, showSalary)
        }
        return periods;
    }
}