import {OrderModel} from "./OrderModel";

export interface CustomerModel{
    id: number;
    name: string;
    surName: string;
    accountNumber: string;
    phone: string;
    email: string;
    orders: OrderModel[];
}