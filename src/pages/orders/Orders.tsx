import {useEffect, useState} from "react";
import {Button, Form, Modal, Stack, Table} from "react-bootstrap";
import {ApiClient} from "../../client/ApiClient";
import {OrderModel} from "../../model/OrderModel";
import OrderRow from "./OrderRow";
import {NewOrderModel} from "../../model/NewOrderModel";
import {CustomerModel} from "../../model/CustomerModel";
import cars from "../cars/Cars";


function Orders(){
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const [newOrder, setNewOrder] = useState<NewOrderModel>
    (new NewOrderModel({} as CustomerModel, [], 0, new Date()));
    const [showModal, setShowModal] = useState<boolean>(false);
    const [customerClass, setCustomerClass] = useState<string>("");
    const [costClass, setCostClass] = useState<string>("");
    const [dateClass, setDateClass] = useState<string>("");

    useEffect(() => {
        ApiClient.getCustomers().then(data => setCustomers(data));
        ApiClient.getOrders().then(data => setOrders(data));
    }, []);

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const createOrder = () => {
        setCustomerClass("");
        setDateClass("");
        if (newOrder.customer && newOrder.customer.id) {
            ApiClient.createOrder(newOrder).then((order) => {
                const ordersCopy = [...orders];
                ordersCopy.push(order);
                setOrders(ordersCopy);
                setNewOrder(new NewOrderModel({} as CustomerModel, [], 0, new Date()));
                closeModal();
            });
        } else {
            if (!newOrder.customer || !newOrder.customer.id) {
                setCustomerClass("border border-danger");
            }
        }
    };

    const deleteOrder = (id: number) => {
        ApiClient.deleteOrder(id).then(() => {
            setOrders(orders.filter(x => x.id !== id));
        }).catch(err => alert(err));
    };

    const getOrderCost = (): number => {
        return newOrder.cars.reduce((totalCost, car) => totalCost + car.price, 0);
    };


    return(
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>Orders</h2>
                <Button variant="success" size="sm" onClick={openModal}>+</Button>
            </Stack>
            <Table bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>CustomerId</th>
                    <th>Cost</th>
                    <th>Date of Order</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders?.map((order: OrderModel) => <OrderRow key={order.id} order={order} customer={order.customer} delete={deleteOrder}/>)}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Customer</Form.Label>
                            <Form.Control as="select" className={customerClass} value={newOrder.customer?.id || ''} onChange={(e) => setNewOrder({...newOrder, customer: customers.find(c => c.id === parseInt(e.target.value))})}>
                                <option value="">Select a customer</option>
                                {customers.map((customer: CustomerModel) => <option key={customer.id} value={customer.id}>{customer.name} {customer.surName}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cost</Form.Label>
                            <Form.Control value={getOrderCost()}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date of Order</Form.Label>
                            <Form.Control className={dateClass} type="date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={createOrder}>
                        Create Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default Orders;