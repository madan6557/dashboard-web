import API from '../service';

export const fetchAllApprovedPlants= async (keyword = "", id_site) => {
    try {
        const response = await API.get(`/approve/plant?keyword=${keyword}&orderBy=location&sortBy=ASC&id_site=${id_site}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const fetchApprovedPlants = async (config) => {
    const {
        page,
        rows,
        orderBy,
        sort,
        search,
        site
    } = config;
    try {
        const response = await API.get(`/approve/search?keyword=${search}&orderBy=${orderBy}&sortBy=${sort}&id_site=${site}&page=${page}&limit=${rows}`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const fetchApprovedPlantByID = async (id_plant) => {
    try {
        const response = await API.get(`/approve/plant/${id_plant}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

// Update data tanaman berdasarkan ID
export const updateApprovedPlant = async (id_plant, data) => {
    try {
        const response = await API.patch(`/approve/${id_plant}`, data);
        return response.message;
    } catch (error) {
        console.error('Failed to update data:', error);
        throw error;
    }
};

// Menghapus tanaman berdasarkan ID
export const deleteApprovedPlant = async (id_plant) => {
    try {
        const response = await API.delete(`/approve/${id_plant}`); // Endpoint: /users/:id
        return response.message;
    } catch (error) {
        console.error('Failed to delete data:', error);
        throw error;
    }
};
