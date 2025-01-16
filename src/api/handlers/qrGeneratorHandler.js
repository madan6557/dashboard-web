import API from '../service';

export const generateQRCode = async (site, config) => {
    try {
        const response = await API.post(`/generate`, config, {
            responseType: 'blob'
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};

export const fetchQRCode = async (site, config) => {
    try {
        const response = await API.post(`/selected`, config, {
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
