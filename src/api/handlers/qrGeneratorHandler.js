import API from '../service';

export const fetchCounter = async (id_site) => {
    try {
        const response = await API.get(`/qr/${id_site}`);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};

export const generateQRCode = async (data) => {
    try {
        const response = await API.post(`/qr/generate`, data, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};

export const fetchQRCode = async (data) => {
    try {
        const response = await API.post(`/qr/selected`, data, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};

export const checkQRCode = async (site) => {
    try {
        const response = await API.get(`/qr/check/${site}`);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};
