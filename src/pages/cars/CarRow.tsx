import {CarModel} from "../../model/CarModel";
import {Button} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {ApiClient} from "../../client/ApiClient";


const CarRow = (params: {car: CarModel, delete: (id: number) => void}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(window.location.search);
    const orderId = queryParams.get("orderId") || "";
    const car = params.car;
    const openDetail = (id: number) => {
        navigate(`/order/${orderId}`);

    }

    const setOrderIdInCar = async () => {
        if (orderId) {
            car.orderId = Number(orderId);
            try {
                await ApiClient.updateCar(car);
                navigate(`/order/${orderId}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return(
        <tr key={params.car.id}>
            <td>{params.car.name}</td>
            <td>{params.car.brand}</td>
            <td>{params.car.modelOfCar}</td>
            <td>{params.car.km}</td>
            <td>{params.car.price}</td>
            <td>{params.car.yearOfProduction}</td>
            <td>
                {orderId ? (
                    <Button variant="success" onClick={setOrderIdInCar}>+</Button>
                ) : (
                    <Button variant="danger" onClick={() => params.delete(params.car.id)}>Delete</Button>
                )}
            </td>
        </tr>
    );
}

export default CarRow;