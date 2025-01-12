import API from '../service';

export const fetchImage = async (filename) => {
    try {
        const response = await API.get(`/image/uploads/${filename}`, {
            responseType: 'blob'
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.warn(`Image not found or error occurred: ${response.status}`);
            return null; 
        }
    } catch (error) {
        console.error('Failed to fetch image:', error);
        throw error;
    }
};

export const addImage = async (data) => {
    try {

        const response = await API.post(`/image/uploads`, data, {
            headers: {
                'Content-Type': 'multipart/form-data' // Mengatur header untuk upload file
            }
        });

        return response;
    } catch (error) {
        console.error('Failed to update image:', error);
        throw error;
    }
};

