import {OrderModel} from "./OrderModel";


export class NewCustomerModel {
    constructor(
        public accountNumber: string,
        public orders: OrderModel[],
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string
    ) {}
}
