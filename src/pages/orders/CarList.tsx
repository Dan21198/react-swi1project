import {CarModel} from "../../model/CarModel";
import {useEffect, useState} from "react";
import {ApiClient} from "../../client/ApiClient";
import { useLocation } from "react-router-dom";
import qs from 'qs';

const CarList = () => {
    const location = useLocation();
    const { orderId } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [cars, setCars] = useState<CarModel[]>([]);
    const { state } = location;

    const handleSelectCar = (car: CarModel) => {
        if (state && state.onSelectCar) {
            state.onSelectCar(car);
        }
    };

    useEffect(() => {
        ApiClient.getCars().then(cars => setCars(cars));
    }, []);

    return (
        <ul>
            {cars.map(car => (
                <li key={car.id}>
                    {car.name} <button onClick={() => handleSelectCar(car)}>Select</button>
                </li>
            ))}
        </ul>
    );
};
