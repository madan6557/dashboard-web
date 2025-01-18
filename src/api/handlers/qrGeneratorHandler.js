import API from '../service';

export const generateQRCode = async (data) => {
    try {
        const response = await API.post(`/generate`, data, {
            responseType: 'blob'
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};

export const fetchQRCode = async (value) => {
    try {
        const response = await API.post(`/selected`, value, {
            responseType: 'blob'
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};

export const checkQRCode = async (site, config) => {
    try {
        const response = await API.post(`/check`, config, {
            responseType: 'blob'
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};
