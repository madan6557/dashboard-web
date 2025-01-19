import API from '../service';

export const generateQRCode = async (data) => {
    try {
        const response = await API.post(`/qr/generate`, data, {
            responseType: 'blob'
        });
        console.log(response);
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
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};

export const checkQRCode = async (site, config) => {
    try {
        const response = await API.post(`/qr/check`, config, {
            responseType: 'blob'
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};
