import API from '../service';

// Mendapatkan semua tanaman
export const fetchOptions = async () => {
    try {
        const response = await API.get(`/option/`); // Endpoint: /users
        return response.data; // Data hasil response dari server
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};