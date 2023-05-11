import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {CustomerModel} from "../../model/CustomerModel";
import {useState} from "react";
import {ApiClient} from "../../client/ApiClient";

const CustomerOrderRow = (params: {customer: CustomerModel, delete: (id: number) => void}) => {
    const navigate = useNavigate();

    const openDetail = (id: number) => {
        navigate("/order/"+id);
    }

    return (
        <tr key={params.customer.id}>
            <td>{params.customer.name}</td>
            <td>{params.customer.surName}</td>
            <td>{params.customer.accountNumber}</td>
            <td>{params.customer.phone}</td>
            <td>{params.customer.email}</td>
            <td>
                <Button variant="info" className="me-2" onClick={() => openDetail(params.customer.id)}>
                    Detail
                </Button>
                <Button variant="danger" onClick={() => params.delete(params.customer.id)}>
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default CustomerOrderRow;