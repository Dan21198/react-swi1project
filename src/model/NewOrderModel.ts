import {CustomerModel} from "./CustomerModel";
import {CarModel} from "./CarModel";


export class NewOrderModel {
    constructor(
        public customer: CustomerModel | undefined,
        public cars: CarModel[],
        public cost: number,
        public dateOfOrder: Date
    ) {}
}