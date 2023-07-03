import {AdminOrderTypes, MealType, PieTypes} from "./Types";
import {RandomColor} from "./RandomColor";


export class ChartPieSettings{
    readonly mealNames: MealType[];
    readonly orders: AdminOrderTypes[];

    public constructor(mealNames: MealType[], orders: AdminOrderTypes[]) {
        this.mealNames = mealNames;
        this.orders = orders;
    }

    private getChartData() {
        const labels = this.mealNames.map((el: MealType) =>
            el.name);
        const labelsAndAmount = labels.reduce((acc: any, curr: any) =>
            (acc[curr] = 0, acc), {});
        for (let order of this.orders) {
            for (let meal of order.meals) {
                labelsAndAmount[meal.name] += meal.amount;
            }
        }
        return labels.map((key: string) => {
            let v = labelsAndAmount[key];
            return {key: key, value: v}
        })
    }

    public getData(){
        const labelsAndAmount = this.getChartData();
        return {
            labels: labelsAndAmount.map((el: PieTypes) => el.key),
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: new RandomColor(labelsAndAmount.length).getColor(),
                    borderColor: "rgb(0,0,255)",
                    data: labelsAndAmount.map((el: PieTypes) => el.value),
                },
            ],
        };
    }
}