import {useEffect, useState} from "react";
import {Button, Form, Modal, Stack, Table} from "react-bootstrap";
import {ApiClient} from "../../client/ApiClient";
import {CustomerModel} from "../../model/CustomerModel";
import CustomerRow from "./CustomerRow";
import {NewCustomerModel} from "../../model/NewCustomerModel";

function Customers(){
    const [customers, setCustomer] = useState<CustomerModel[]>([]);
    const [newCustomer, setNewCustomer] = useState<NewCustomerModel>(
        new NewCustomerModel("", [], "", "", "", ""));
    const [showModal, setShowModal] = useState<boolean>(false);
    const [nameClass, setNameClass] = useState<string>("");
    const [surnameClass, setSurNameClass] = useState<string>("");
    const [accountClass, setAccountClass] = useState<string>("");
    const [phoneClass, setPhoneClass] = useState<string>("");
    const [emailClass, setEmailClass] = useState<string>("");

    useEffect(() => {
        ApiClient.getCustomers().then(data => setCustomer(data));
    }, []);

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const createCustomer = () => {
        setAccountClass("");
        setNameClass("");
        setSurNameClass("");
        setEmailClass("");
        setPhoneClass("");

        if (newCustomer.firstName && newCustomer.lastName && newCustomer.email && newCustomer.phoneNumber) {
            ApiClient.createCustomer(newCustomer).then(customer => {
                const customersCopy = customers.slice();
                customersCopy.push(customer);
                setCustomer(customersCopy);
                setNewCustomer(new NewCustomerModel("", [], "", "", "", ""));
                closeModal();
            });
        } else {
            if (!newCustomer.firstName || newCustomer.firstName.trim().length === 0) {
                setNameClass("border border-danger");
            }
            if (!newCustomer.lastName || newCustomer.lastName.trim().length === 0) {
                setSurNameClass("border border-danger");
            }
            if (!newCustomer.email || newCustomer.email.trim().length === 0) {
                setEmailClass("border border-danger");
            }
            if (!newCustomer.phoneNumber || newCustomer.phoneNumber.trim().length === 0) {
                setPhoneClass("border border-danger");
            }
        }
    }


    const deleteCustomer = (id: number) => {
        ApiClient.deleteCustomer(id)
            .then(() => {
                setCustomer(customers.filter((x) => x.id !== id));
            })
            .catch((err) => alert(err));
    };

    const firstNameChanged = (event: any) => {
        const customer = new NewCustomerModel(
            newCustomer.accountNumber,
            newCustomer.orders,
            newCustomer.firstName,
            newCustomer.lastName,
            newCustomer.email,
            newCustomer.phoneNumber
        );
        customer.firstName = event.target.value;
        setNewCustomer(customer);
    };

    const lastNameChanged = (event: any) => {
        const customer = new NewCustomerModel(
            newCustomer.accountNumber,
            newCustomer.orders,
            newCustomer.firstName,
            newCustomer.lastName,
            newCustomer.email,
            newCustomer.phoneNumber
        );
        customer.lastName = event.target.value;
        setNewCustomer(customer);
    };

    const emailChanged = (event: any) => {
        const customer = new NewCustomerModel(
            newCustomer.accountNumber,
            newCustomer.orders,
            newCustomer.firstName,
            newCustomer.lastName,
            newCustomer.email,
            newCustomer.phoneNumber
        );
        customer.email = event.target.value;
        setNewCustomer(customer);
    };

    const phoneChanged = (event: any) => {
        const customer = new NewCustomerModel(
            newCustomer.accountNumber,
            newCustomer.orders,
            newCustomer.firstName,
            newCustomer.lastName,
            newCustomer.email,
            newCustomer.phoneNumber
        );
        customer.phoneNumber = event.target.value;
        setNewCustomer(customer);
    };

    const accountChanged = (event: any) => {
        const customer = new NewCustomerModel(
            newCustomer.accountNumber,
            newCustomer.orders,
            newCustomer.firstName,
            newCustomer.lastName,
            newCustomer.email,
            newCustomer.phoneNumber
        );
        customer.accountNumber = event.target.value;
        setNewCustomer(customer);
    };



    return(
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>Customers</h2>
                <Button variant="success" size="sm" onClick={openModal}>+</Button>
            </Stack>
            <Table bordered>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Account Number</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers?.map((customer: CustomerModel) => <CustomerRow key={customer.id} customer={customer} delete={deleteCustomer}/>)}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Customer name</Form.Label>
                            <Form.Control className={nameClass} type="text" onChange={firstNameChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Customer surname</Form.Label>
                            <Form.Control className={surnameClass} type="text" onChange={lastNameChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Account number</Form.Label>
                            <Form.Control className={accountClass} type="text" onChange={accountChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control className={phoneClass} type="text" onChange={phoneChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={emailClass} type="email" onChange={emailChanged}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={createCustomer}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Customers;