import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {OrderModel} from "../../model/OrderModel";
import {CustomerModel} from "../../model/CustomerModel";
import orders from "./Orders";
import customers from "../customers/Customers";
import {ApiClient} from "../../client/ApiClient";
import {useEffect, useState} from "react";

const OrderRow = (params: {order: OrderModel, delete: (id: number) => void,  customer?: CustomerModel}) => {
    const navigate = useNavigate();
    const {order} = params;
    const [customer, setCustomer] = useState<CustomerModel>();

    useEffect(() => {
        ApiClient.getCustomerByOrderId(order.id)
            .then(customer => setCustomer(customer))
            .catch(() => navigate("/notFound"));
    }, [order.id, navigate]);

    const openDetail = (id: number) => {
        navigate("/order/"+id);
    }

    return (
        <tr key={params.order.id}>
            <td>{params.order.id}</td>
            <td>{customer?.accountNumber ?? 'NaN'}</td>
            <td>{params.order.cost}</td>
            <td>{params.order.dateOfOrder ? new Date(params.order.dateOfOrder).getFullYear() : "?"}</td>
            <td>
                <Button variant="info" className="me-2" onClick={() => openDetail(params.order.id)}>
                    Detail
                </Button>
                <Button variant="danger" onClick={() => params.delete(params.order.id)}>
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default OrderRow;