import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';
import {AdminOrderTypes, MealType} from "../../../models/Types";
import {ChartPieSettings} from "../../../models/ChartPieSettings";


export default function ProductsPie(
    props: {meals: MealType[], orders: AdminOrderTypes[]}
) {
    const data = new ChartPieSettings(props.meals, props.orders).getData()

    return (
        <div>
            <Chart type='doughnut' data={data}/>
        </div>
    );
};
