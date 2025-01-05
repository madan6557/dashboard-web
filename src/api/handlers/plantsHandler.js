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
        const response = await API.get(`/approve/search?keyword=${search}&orderBy=${orderBy}&sortBy=${sort}&site=${site}&page=${page}&limit=${rows}`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        console.error('Error fetching plants data:', error);
        throw error; // Oper kesalahan ke pemanggil fungsi
    }
};

export const fetchPlantByID = async (id_plant) => {
    try {
        const response = await API.get(`/approve/plant/${id_plant}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching plant data:', error);
        throw error;
    }
};

// Update data tanaman berdasarkan ID
export const updatePlant = async (plantId, data) => {
    try {
        const response = await API.patch(`/approve/:${plantId}`, data);
        return response.message;
    } catch (error) {
        console.error('Error updating plant data:', error);
        throw error;
    }
};

// Menghapus tanaman berdasarkan ID
export const deletePlant = async (plantId) => {
    try {
        const response = await API.delete(`/approve/:${plantId}`); // Endpoint: /users/:id
        return response.message;
    } catch (error) {
        console.error('Error deleting plant data:', error);
        throw error;
    }
};
