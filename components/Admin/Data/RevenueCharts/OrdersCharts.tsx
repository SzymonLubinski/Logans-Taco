import { Line } from "react-chartjs-2";
import {AdminOrderTypes} from "../../../models/Types";
import {ChartLineSettings} from "../../../models/ChartLineSettings";
import dayjs from 'dayjs';
import localeData  from 'dayjs/plugin/localeData';
import * as pl from 'dayjs/locale/pl'

dayjs.extend(localeData);
dayjs.locale(pl);


export default function OrdersCharts (props: {
    orders: AdminOrderTypes[];
}) {

    const chartSale = new ChartLineSettings(props.orders, '2023');
    const chartSaleOptions = chartSale.getLineOptions('wielkość przychodów');
    const chartSaleData = chartSale.getLineData('sales');


    const chartOrders = new ChartLineSettings(props.orders, '2023');
    const chartOrdersOptions = chartOrders.getLineOptions('ilość zamówień');
    const chartOrdersData = chartSale.getLineData('orders');

    return (
        <>
            <Line options={chartSaleOptions} data={chartSaleData}/>
            <Line options={chartOrdersOptions} data={chartOrdersData}/>
        </>
    )
}