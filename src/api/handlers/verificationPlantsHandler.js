import handleError from '../helper/errorHandler';
import API from '../service';

// Mendapatkan semua tanaman
export const fetchPlants = async (config) => {
    const {
        page,
        rows,
        orderBy,
        sort,
        search,
        site
    } = config;
    try {
        const response = await API.get(`/verification/search?keyword=${search}&orderBy=${orderBy}&sortBy=${sort}&site=${site}&page=${page}&limit=${rows}`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        handleError(error);
    }
};

export const fetchPlantByID = async (id_plant) => {
    try {
        const response = await API.get(`/approve/plant/${id_plant}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Update data tanaman berdasarkan ID
export const updatePlant = async (id_plant, data) => {
    try {
        const response = await API.patch(`/approve/${id_plant}`, data);
        return response.message;
    } catch (error) {
        handleError(error);
    }
};

// Menghapus tanaman berdasarkan ID
export const deletePlant = async (id_plant) => {
    try {
        const response = await API.delete(`/approve/${id_plant}`); // Endpoint: /users/:id
        return response.message;
    } catch (error) {
        handleError(error);
    }
};
