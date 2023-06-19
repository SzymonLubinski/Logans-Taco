export default class Order {
    id: string;
    totalAmount: number;
    price: number;
    name: string;
    amount: number;

    constructor(totalAmount: number, amount: number, price: number, name: string) {
        this.id = new Date().toISOString();
        this.totalAmount = totalAmount;
        this.price = price;
        this.name = name;
        this.amount = amount
    }
}
