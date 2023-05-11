import { CarModel } from "../../model/CarModel";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { useState } from "react";

const CarCard = (params: {
    car: CarModel;
    newRecord: boolean;
    delete: (car: CarModel, newRecord: boolean) => void;
    save: (car: CarModel, newRecord: boolean) => void;
}) => {
    const [car, setCar] = useState<CarModel>(params.car);
    const [changed, setChanged] = useState<boolean>(false);

    const brandChanged = (event: any) => {
        setChanged(true);
        setCar({ ...car, brand: event.target.value });
    };

    const modelChanged = (event: any) => {
        setChanged(true);
        setCar({ ...car, modelOfCar: event.target.value });
    };

    const yearChanged = (event: any) => {
        setChanged(true);
        setCar({ ...car, yearOfProduction: Number(event.target.value) });
    };

    const saveChanges = () => {
        setChanged(false);
        params.save(car, params.newRecord);
    };

    return (
        <>
            <Card className="mb-2">
                <Card.Body>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control onChange={brandChanged} value={car.brand} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Model</Form.Label>
                                <Form.Control onChange={modelChanged} value={car.modelOfCar} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Year</Form.Label>
                                <Form.Control onChange={yearChanged} value={car.yearOfProduction} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Stack direction="horizontal" gap={3}>
                        {params.newRecord || changed ? (
                            <Button variant="success" onClick={saveChanges}>
                                Save Changes
                            </Button>
                        ) : (
                            <></>
                        )}
                        <Button
                            variant="danger"
                            onClick={() => params.delete(car, params.newRecord)}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Card.Footer>
            </Card>
        </>
    );
};

export default CarCard;
