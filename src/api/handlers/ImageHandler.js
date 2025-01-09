import handleError from "../helper/errorHandler";
import API from '../service';

export const fetchImage = async () => {
    try {
        const response = await API.get(`/option/`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        handleError(error);
    }
};