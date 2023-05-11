import {CarModel} from "../model/CarModel";
import {NewCarModel} from "../model/NewCarModel";
import {isNumberObject} from "util/types";
import {isNumber} from "util";
import {OrderModel} from "../model/OrderModel";
import {CustomerModel} from "../model/CustomerModel";
import {NewOrderModel} from "../model/NewOrderModel";
import {NewCustomerModel} from "../model/NewCustomerModel";

export class ApiClient{
    public static async getCars():Promise<CarModel[]>{
        const response = await fetch("http://localhost:8080/cars");
        return await response.json();
    }

    static async getCarWithoutOrder(): Promise<CarModel[]> {
        const response = await fetch(`http://localhost:8080/cars/notInOrder`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    public static async getOrders():Promise<OrderModel[]>{
        const response = await fetch("http://localhost:8080/orders");
        return await response.json();
    }

    public static async getCustomers():Promise<CustomerModel[]>{
        const response = await fetch("http://localhost:8080/customers");
        return await response.json();
    }

    public static async getCar(id: number):Promise<CarModel>{
        const response = await fetch(`http://localhost:8080/getCarById/${id}`);
        if(response.ok){
            return await response.json();
        }
        throw new Error("Not found");
    }

    public static async getOrder(id: number): Promise<OrderModel> {
        const response = await fetch(`http://localhost:8080/orders/${id}`);
        if (response.ok) {
            return await response.json();
        }
        throw new Error("Not found");
    }

    public static async getCustomerByOrderId(orderId: number): Promise<CustomerModel> {
        const response = await fetch(`http://localhost:8080/orders/${orderId}/customer`);
        if (response.ok) {
            return await response.json();
        }
        throw new Error("Not found");
    }

    public static async createCar(newCar: NewCarModel): Promise<CarModel> {
        const car = {
            brand: newCar.brand,
            km: newCar.km,
            modelOfCar: newCar.modelOfCar,
            price: newCar.price,
            yearOfProduction: newCar.yearOfProduction ? Number(newCar.yearOfProduction) : 2000
        } as CarModel;

        const response = await fetch("http://localhost:8080/cars", {
            method: "POST",
            body: JSON.stringify(car),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return await response.json();
    }

    public static async createOrder(newOrder: NewOrderModel): Promise<OrderModel> {
        const order = {
            customer: {
                id: newOrder.customer?.id ?? null
            },
            cars: newOrder.cars,
            cost: newOrder.cost,
            dateOfOrder: newOrder.dateOfOrder
        } as OrderModel;

        const response = await fetch("http://localhost:8080/orders", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return await response.json();
    }

    public static async updateCar(car: CarModel): Promise<void> {
        const request = {
            id: car.id,
            order: {
                id: car.orderId
            },
            name: car.name,
            brand: car.brand,
            yearOfProduction: car.yearOfProduction,
            modelOfCar: car.modelOfCar,
            km: car.km,
            price: car.price
        };
        const response = await fetch(`http://localhost:8080/cars/${car.id}`, {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return;
        }
        throw new Error(JSON.stringify(await response.json()));
    }

    public static async updateDeleteCar(car: CarModel): Promise<void> {
        const request = {
            brand: car.brand,
            modelOfCar: car.modelOfCar,
            yearOfProduction: car.yearOfProduction,
            km: car.km,
            price: car.price,
            order: car.orderId ? { id: car.orderId } : null
        };

        const response = await fetch(`http://localhost:8080/cars/${car.id}`, {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return;
        }

        throw new Error(JSON.stringify(await response.json()));
    }

    public static async updateOrder(order: OrderModel): Promise<void> {
        const customer = await ApiClient.getCustomerByOrderId(order.id);

        const request = {
            id: order.id,
            cars: order.cars.map(car => ({
                id: car.id,
                name: car.name,
                brand: car.brand,
                yearOfProduction: new Date(car.yearOfProduction).getFullYear(),
                modelOfCar: car.modelOfCar,
                km: car.km,
                price: car.price
            })),
            customer: customer,
            cost: order.cost,
            dateOfOrder: new Date(order.dateOfOrder).toISOString()
        };

        const response = await fetch(`http://localhost:8080/orders/${order.id}`, {
            method: 'PUT',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return;
        }

        throw new Error(JSON.stringify(await response.json()));
    }




    public static async deleteCar(id: number): Promise<void> {
        const response = await fetch(`http://localhost:8080/cars/${id}`,
            {
                method : "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        if(response.ok){
            return;
        }
        throw new Error(JSON.stringify(await response.json()));
    }

    public static async deleteOrder(id: number): Promise<void> {
        const response = await fetch(`http://localhost:8080/orders/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            return;
        }
        throw new Error(JSON.stringify(await response.json()));
    }

    public static async createCustomer(newCustomer: NewCustomerModel): Promise<CustomerModel> {
        const customer = {
            name: newCustomer.firstName,
            surName: newCustomer.lastName,
            phone: newCustomer.phoneNumber,
            accountNumber: newCustomer.accountNumber,
            email: newCustomer.email,
            orders: newCustomer.orders
        } as CustomerModel;

        const response = await fetch("http://localhost:8080/customers", {
            method: "POST",
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }



    public static async deleteCustomer(id: number): Promise<void> {
        const response = await fetch(`http://localhost:8080/customers/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            return;
        }
        throw new Error(JSON.stringify(await response.json()));
    }


    public static async getCarsByBrand(brand: string):Promise<CarModel[]>{
        const response = await fetch(`http://localhost:8080/cars/brand/${brand}`);
        return await response.json();
    }
}