import API from '../service';

// Mendapatkan semua tanaman
export const fetchPlantsHistory = async (config) => {
    const {
        page,
        rows,
        orderBy,
        sort,
        search,
        site
    } = config;
    try {
        const response = await API.get(`/verification/search?keyword=${search}&orderBy=${orderBy}&sortBy=${sort}&id_site=${site}&page=${page}&limit=${rows}`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const fetchPlantHistoryById = async (id_verification) => {
    try {
        const response = await API.get(`/verification/${id_verification}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}

export const fetchUnverifiedPlants = async (config) => {
    const {
        page,
        rows,
        orderBy,
        sort,
        search,
        site
    } = config;
    try {
        const response = await API.get(`/verification/?keyword=${search}&orderBy=${orderBy}&sortBy=${sort}&id_site=${site}&page=${page}&limit=${rows}`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const compareUnverifiedPlantByID = async (id_verification) => {
    try {
        const response = await API.get(`/verification/compare/${id_verification}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const updatePlantVerification = async (id_verification, data) => {
    try {
        const response = await API.patch(`/verification/${id_verification}`, data);
        return response.message;
    } catch (error) {
        console.error('Failed to update data:', error);
        throw error;
    }
};

