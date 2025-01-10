import handleError from "../helper/errorHandler";
import API from '../service';

export const fetchImage = async (filename) => {
    try {
        const response = await API.get(`/image/uploads/${filename}`, {
            responseType: 'blob' // Set response type to blob
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
