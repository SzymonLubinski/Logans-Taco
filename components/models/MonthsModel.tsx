export class MonthsModel{
    public getMonths() {
        let labels = [];
        for (let i = 0; i < 12; i++) {
            labels.push(i)
        }
        return labels;
    }
}