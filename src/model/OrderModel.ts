import {CarModel} from "./CarModel";
import {CustomerModel} from "./CustomerModel";

export interface OrderModel {
    id: number;
    customer: CustomerModel;
    cars: CarModel[];
    cost: number;
    customerId: number;
    dateOfOrder: Date;
}