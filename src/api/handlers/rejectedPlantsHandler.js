import API from '../service';

// Mendapatkan semua tanaman
export const fetchRejectedPlants = async (config) => {
    const {
        page,
        rows,
        orderBy,
        sort,
        search,
        site
    } = config;
    try {
        const response = await API.get(`/reject/search?keyword=${search}&orderBy=${orderBy}&sortBy=${sort}&id_site=${site}&page=${page}&limit=${rows}`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const fetchRejectedPlantByID = async (id_reject) => {
    try {
        const response = await API.get(`/reject/${id_reject}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};