export class RandomColor {
    readonly howManyColors: number;

    constructor(howManyColors: number) {
        this.howManyColors = howManyColors;
    }

    private randomInt() {
        return Math.floor(Math.random() * 255);
    }

    public getColor() {
        let colors = [];
        for (let i = 0;i < this.howManyColors; i++) {
            colors.push(`rgb(${this.randomInt()}, ${this.randomInt()}, ${this.randomInt()})`)
        }
        return colors
    }
}