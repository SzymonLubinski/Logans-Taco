import dayjs from "dayjs";


export class ChartBarSettings {
    readonly periodsData: any;
    readonly colors: string[];
    readonly title: string;

    constructor(periodsData: any, colors: string[], title: string) {
        this.periodsData = periodsData;
        this.colors = colors;
        this.title = title;
    }
    private getNicks () {
        let nicks: any = [];
        Object.values(this.periodsData).map((employeesOfTheMonth: any) => {
            for (let emp of Object.keys(employeesOfTheMonth)){
                if (!nicks.includes(emp)){
                    nicks.push(emp);
                }
            }
        })
        return nicks;
    }
    private periodsMapping() {
        return Object.keys(this.periodsData).map((period: any) => {
            return this.periodsData[period]
        });
    }
    private getMonths(){
        return Object.keys(this.periodsData).map((period: string) => {
            return dayjs.monthsShort()[Number(period)];
        })
    }
    public getBarData(){
        let datasets: any = [];
        let colorInt = 0
        for (let nick of this.getNicks()){
            const data = this.periodsMapping().map((employeesOfTheMonth: any) => {
                if (employeesOfTheMonth[nick]){
                    return employeesOfTheMonth[nick];
                } else {
                    return 0;
                }
            });
            datasets.push({
                label: nick,
                data: data,
                backgroundColor: this.colors[colorInt],
            })
            colorInt += 1;
        }


        return {
            labels: this.getMonths(),
            datasets: datasets,
        }
    }

    public getBarOptions(){
        return {
            plugins: {
                title: {
                    display: true,
                    text: this.title,
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
        };
    }
}