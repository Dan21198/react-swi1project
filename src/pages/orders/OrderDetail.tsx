import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Form, Row, Stack} from "react-bootstrap";
import {ApiClient} from "../../client/ApiClient";
import {OrderModel} from "../../model/OrderModel";
import {CarModel} from "../../model/CarModel";
import CarCard from "./CarCard";
import cars from "../cars/Cars";
import {CustomerModel} from "../../model/CustomerModel";
import customers from "../customers/Customers";
const OrderDetail = () => {
    const {id} = useParams();
    const [order, setOrder] = useState<OrderModel>();
    const [customer, setCustomer] = useState<CustomerModel>();
    const [newCar, setNewCar] = useState<CarModel | null>(null);
    const [changed, setChanged] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id || id === 'number') {
            ApiClient.getOrder(parseInt(id))
                .then(order => setOrder(order))
                .catch(() => navigate("/notFound"));

            ApiClient.getCustomerByOrderId(parseInt(id))
                .then(customer => setCustomer(customer))
                .catch(() => navigate("/notFound"));
            console.log(customer);

        } else {
            navigate("/notFound");
        }
    }, [id, navigate]);

    const getOrderCost = () => {
        if (!order || !order.cars) {
            return 0;
        }
        return order.cars.reduce((total, car) => total + car.price, 0);
    };

    const saveChanges = () => {
        if (order) {
            ApiClient.updateOrder(order).then(() => {
                setChanged(false);
            }).catch((err) => alert(JSON.stringify(err)));
        }
    };

    const customerChanged = (event: any) => {
        if (order) {
            const updatedCustomer = {
                ...order.customer,
                [event.target.name]: event.target.value
            };
            const updatedOrder = {
                ...order,
                customer: updatedCustomer
            };
            setOrder(updatedOrder);
        }
    };

    const costChanged = (event: any) => {
        if (order) {
            setChanged(true);
            const cost = Number(event.target.value);
            setOrder({ ...order, cost });
        }
    };

    const dateOfOrderChanged = (event: any) => {
        if (order) {
            setChanged(true);
            const dateString = event.target.value;
            const date = new Date(dateString);
            setOrder({...order, dateOfOrder: date});
        }
    };

    const handleSelectCar = (car: CarModel) => {
        setNewCar(car);
    };

    const addCar = async () => {
        try {
            if (order && order.id) {
                const carsNotInOrder: CarModel[] = await ApiClient.getCarWithoutOrder();
                navigate(`/cars?orderId=${order.id}`, { state: { onSelectCar: handleSelectCar, availableCars: carsNotInOrder } });
            } else {
                const availableCars: CarModel[] = await ApiClient.getCars();
                navigate('/cars', { state: { onSelectCar: handleSelectCar, availableCars: availableCars } });
            }
        } catch (error) {
            console.error(error);
        }
    };


    const saveCar = (car: CarModel, isNewRecord: boolean) => {
        if (isNewRecord) {
            ApiClient.createCar(car).then((createdCar: CarModel) => {
                setNewCar(null);
                const cars = order?.cars;
                if (cars) {
                    cars.push(createdCar);
                    setOrder({...order, cars: cars});
                }
            }).catch(err => alert(err));
        } else {
            ApiClient.updateCar(car).then().catch(err => alert(err));
        }
    };

    const deleteCar = (car: CarModel, newRecord: boolean) => {
        if (newRecord) {
            setNewCar(null);
        } else {
            setChanged(true);
            const updatedCar = { ...car, orderId: null };

            ApiClient.updateDeleteCar(updatedCar).then(() => {
                if (order && order.cars) {
                    setOrder({
                        ...order,
                        cars: order.cars.filter((x) => x.id !== car.id),
                    });
                }
            }).catch(err => alert(err));
        }
    };


    return (
        <>
            <h2>Order detail</h2>
            <Row>
                <div className="col-md-12 col-lg-6">
                    <Form.Group>
                        <Form.Label>Customer Code</Form.Label>
                        <Form.Control
                            onChange={customerChanged}
                            value={customer?.accountNumber ?? 'NaN'}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control onChange={costChanged} value={getOrderCost()}/>
                    </Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        onChange={dateOfOrderChanged}
                        value={order?.dateOfOrder ? new Date(order.dateOfOrder).toISOString().substr(0, 10) : ''}
                    />
                    {changed ? <Form.Group className="mt-4">
                            <Button variant="success" onClick={saveChanges}>Save changes</Button>
                        </Form.Group> :
                        <></>}</div>
                <div className="col-md-12 col-lg-6">
                    <Stack direction="horizontal" gap={3}>
                        <h3>Order Cars</h3>
                        <Button className="mb-2" onClick={addCar} variant="success" size="sm">+</Button>
                    </Stack>
                    <>
                        {}
                        {order?.cars.map(car => <CarCard key={car.id} car={car} newRecord={false}
                                                         save={saveCar}
                                                         delete={deleteCar}/>)}
                    </>
                    <>
                        {newCar ? <CarCard key={newCar.id} car={newCar} newRecord={true}
                                           save={saveCar}
                                           delete={deleteCar}/> : <></>}
                    </>
                </div>
            </Row>
        </>
    )
};
export default OrderDetail;
