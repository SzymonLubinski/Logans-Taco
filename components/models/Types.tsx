import {ReactNode} from "react";
import Order from "./order";


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
    onShow: any;
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
    employeeName: string;
    contractStarts: string;
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
}
export interface AllDataTypes{
    employeesData: EmployeeTypes[];
    mealsData: MealType[];
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