import {useEffect, useState} from "react";
import CarRow from "./CarRow";
import {Button, Form, Modal, Stack, Table} from "react-bootstrap";
import {NewCarModel} from "../../model/NewCarModel";
import {CarModel} from "../../model/CarModel";
import {ApiClient} from "../../client/ApiClient";
import { useLocation } from 'react-router-dom';


function Cars(){
    const [cars, setCars] = useState<CarModel[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newCar, setNewCar] = useState<NewCarModel>(new NewCarModel("","",0,"",0,0));
    const [nameClass, setNameClass] = useState<string>("");
    const [brandClass, setBrandClass] = useState<string>("");
    const [yearClass, setYearClass] = useState<string>("");
    const [modelClass, setModelClass] = useState<string>("");
    const [kmClass, setKmClass] = useState<string>("");
    const [priceClass, setPriceClass] = useState<string>("");
    const [foundedClass, setFoundedClass] = useState<string>("");
    const location = useLocation();
    const orderId = new URLSearchParams(location.search).get('orderId');

    useEffect(() => {
        if (orderId) {
            ApiClient.getCarWithoutOrder().then(data => setCars(data));
        } else {
            ApiClient.getCars().then(data => setCars(data));
        }
    }, [orderId]);

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const brandChanged = (event: any) => {
        const car = new NewCarModel(newCar.name, newCar.brand, newCar.yearOfProduction, newCar.modelOfCar, newCar.km, newCar.price);
        car.brand = event.target.value;
        setNewCar(car);
    };

    const yearChanged = (event: any) => {
        const car = new NewCarModel(newCar.name, newCar.brand, newCar.yearOfProduction, newCar.modelOfCar, newCar.km, newCar.price);
        car.yearOfProduction = event.target.value;
        setNewCar(car);
    };

    const modelChanged = (event: any) => {
        const car = new NewCarModel(newCar.name, newCar.brand, newCar.yearOfProduction, newCar.modelOfCar, newCar.km, newCar.price);
        car.modelOfCar = event.target.value;
        setNewCar(car);
    };

    const kmChanged = (event: any) => {
        const car = new NewCarModel(newCar.name, newCar.brand, newCar.yearOfProduction, newCar.modelOfCar, newCar.km, newCar.price);
        car.km = event.target.value;
        setNewCar(car);
    };

    const priceChanged = (event: any) => {
        const car = new NewCarModel(newCar.name, newCar.brand, newCar.yearOfProduction, newCar.modelOfCar, newCar.km, newCar.price);
        car.price = event.target.value;
        setNewCar(car);
    };

    const createCar = () =>{
        setNameClass("");
        setBrandClass("");
        setYearClass("");
        setModelClass("");
        setKmClass("");
        setPriceClass("");
        if(newCar.brand && newCar.modelOfCar && newCar.yearOfProduction){
            ApiClient.createCar(newCar).then(car => {
                const carsCopy = cars.slice();
                carsCopy.push(car);
                setCars(carsCopy);
                setNewCar(new NewCarModel("", "", 0,"", 0, 0));
                closeModal();
            });
        } else {
            if(!newCar.name || newCar.name.trim().length === 0){
                setNameClass("border border-danger");
            }
            if(!newCar.brand){
                setBrandClass("border border-danger");
            }
            if(!newCar.yearOfProduction){
                setYearClass("border border-danger");
            }
            if(!newCar.modelOfCar){
                setModelClass("border border-danger");
            }
            if(!newCar.km){
                setKmClass("border border-danger");
            }
            if(!newCar.price){
                setPriceClass("border border-danger");
            }
        }
    };

    const deleteCar = (id: number) => {
        ApiClient.deleteCar(id).then(() => {
            setCars(cars.filter(x => x.id !== id));
        }).catch(err => alert(err));
    };

    return(
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>Cars</h2>
                <Button variant="success" size="sm" onClick={openModal}>+</Button>
            </Stack>
            <Table bordered>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year of production</th>
                    <th>Kilometers</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cars?.map((car: CarModel) => <CarRow key={car.id} car={car} delete={deleteCar}/>)}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control className={brandClass} type="text" onChange={brandChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Model</Form.Label>
                            <Form.Control className={modelClass} type="text" onChange={modelChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year of production</Form.Label>
                            <Form.Control className={yearClass} type="number" onChange={yearChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kilometers</Form.Label>
                            <Form.Control className={kmClass} type="number" onChange={kmChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control className={priceClass} type="number" onChange={priceChanged}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={createCar}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Cars;