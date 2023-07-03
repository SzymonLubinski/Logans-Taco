import {AdminOrderTypes, ChartTypes} from "./Types";
import {RandomColor} from "./RandomColor";
import dayjs from "dayjs";
import {MonthsModel} from "./MonthsModel";


export class ChartLineSettings {
    readonly orders: AdminOrderTypes[];
    readonly year: string;
    public constructor(orders: AdminOrderTypes[], year: string) {
        this.orders = orders;
        this.year = year;
    }

    private getData(typeOfData: string){
        const months = new MonthsModel().getMonths()
        return months.map((month: number) => {
            let currentAmount = 0;
            for (let order of this.orders){
                if (month === dayjs(order.date).month()){
                    switch (typeOfData){
                        case 'orders':
                            currentAmount ++;
                            break;
                        case 'sales':
                            currentAmount += order.totalAmount;
                            break;
                    }
                }
            }
            return {key: month, value: currentAmount}
        })
    }

    public getLineOptions(title: string){
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: title,
                },
            },
        }
    }

    public getLineData(typeOfData: string){
        const chartData = this.getData(typeOfData);
        const color = new RandomColor(1).getColor();
        return {
            labels: chartData.map((el: ChartTypes) => dayjs.monthsShort()[el.key]),
            datasets: [
                {
                    label: 'Rok ' + this.year,
                    data: chartData.map((el: ChartTypes) => el.value),
                    borderColor: color,
                    backgroundColor: color,
                }
            ],
        }
    }
}