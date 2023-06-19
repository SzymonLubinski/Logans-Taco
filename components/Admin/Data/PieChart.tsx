import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


const PieChart = (props: any) => {
    // console.log(props.firmsData.ordersData)

    const labels = props.firmsData.mealsData.map((el: any) => el.name)
    const dataChart = props.firmsData.ordersData.map((order: any) => {
        // trzeba tu zrobić pobierania i układanie danych
    })

    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(0,0,255)",
                data: [15, 10, 15, 12, 20, 30],
            },
        ],
    };

    return (
        <div>
            <Chart type='doughnut' data={data} />
        </div>
    );
};
export default PieChart;