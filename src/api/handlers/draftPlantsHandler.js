import API from '../service';

// Mendapatkan semua tanaman
export const fetchDraftPlants = async (config) => {
    const {
        page,
        rows,
        orderBy,
        sort,
        search,
        site
    } = config;
    try {
        const response = await API.get(`/draft/search?keyword=${search}&orderBy=${orderBy}&sortBy=${sort}&id_site=${site}&page=${page}&limit=${rows}`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const fetchDraftPlantByID = async (id_draft) => {
    try {
        const response = await API.get(`/draft/${id_draft}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};