import API from '../config';

// Mendapatkan semua tanaman
export const fetchPlants = async () => {
    try {
        const response = await API.get('/plants'); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        console.error('Error fetching plants data:', error);
        throw error; // Oper kesalahan ke pemanggil fungsi
    }
};

// Update data tanaman berdasarkan ID
export const updatePlant = async (plantId, data) => {
    try {
        const response = await API.patch(`/plants/${plantId}`, data);
        return response.message;
    } catch (error) {
        console.error('Error updating plant data:', error);
        throw error;
    }
};

// Menghapus tanaman berdasarkan ID
export const deletePlant = async (userId) => {
    try {
        const response = await API.delete(`/plants/${userId}`); // Endpoint: /users/:id
        return response.message;
    } catch (error) {
        console.error('Error deleting plant data:', error);
        throw error;
    }
};
