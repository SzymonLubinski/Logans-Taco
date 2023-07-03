import {ReactNode} from "react";
import Order from "./order";
import {Dayjs} from 'dayjs';

export interface MealType {
    _id: string;
    name: string;
    image: string;
    ingredients: string;
    price: number;
}
export type ItemTypes = {
    amount: number;
    id: string;
    name: string;
    price: number;
}
export interface ContactTypes{
    apartment: string;
    city: string;
    code: string;
    email: string;
    phone: string;
    street: string;
}
export interface OnShowFinishType {
    onShow: (which?:string) => void;
}
export interface onCloseType{
    onClose?: () => void;
}
export interface onShowType{
    onShow?: (which: string) => void;
}
export interface ModalType {
    children: ReactNode;
}
export interface BackdropType extends onCloseType, onShowType{

}
export interface PortalTypes extends BackdropType, ModalType {

}
export interface ContactInputTypes {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    register: any;
    required: boolean;
    minLength: number;
    maxLength: number;
    errors: any;
    errorMessage: string;
}
export interface EmployeeTypes {
    _id: string;
    empNick: string;
    contractType: string;
    contractStart: string;
    contractEnd: string;
    salaryPerHour: number;
}
export interface OrderItemTypes{
    id: string;
    name: string;
    amount: number;
    price: number;
    removeOrder: () => void;
    addOrder: () => void;
}
export interface AdminOrderTypes{
    _id: string;
    contact: ContactTypes;
    freeDelivery: boolean;
    isSent: boolean;
    meals: ItemTypes[];
    totalAmount: number;
    date: string;
}
export interface AllDataTypes{
    mealsData: MealType[];
    employeesData: EmployeeTypes[];
    ordersData: AdminOrderTypes[];
}
export interface HeaderTypes {
    onShowOrder?: () => void;
    onShowMenu?: () => void;
}
export interface ButtonProps extends HeaderTypes{
    image: string;
}
export interface ValidType {
    info: string
}
export interface OrderContextObj {
    items: Order[];
    totalAmount: number;
    freeDelivery: boolean;
    addOrder: (item: ItemTypes) => void;
    removeOrder: (name: string) => void;
    clearOrder: () => void;
}
export interface actionTypes {
    type: string;
    payload: any;
}
export interface defaultOrderType {
    items: ItemTypes[];
    totalAmount: number;
    freeDelivery: boolean;
}
export interface NaviType{
    OnChangeTab: (newTav: string) => void;
}
export interface FulfillmentType {
    fulfillment: boolean;
}
export interface ChartTypes{
    key: number;
    value: number
}
export interface PieTypes{
    key: string;
    value: number
}
export interface AddSalaryTypes{
    periods: any;
    month: number;
    nick: string;
    from: Dayjs;
    to: Dayjs;
    salary: number;
}
export interface TabsTypes{
    text: string;
    tab: string;
}
export interface TabTypes{
    currTab: string,
    tabs: TabsTypes[],
    changeTab: (which: string) => void
}
export interface RegisterDataTypes{
    email: string;
    password: string;
    name: string;
}