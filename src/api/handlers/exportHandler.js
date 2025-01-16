import API from '../service';

export const fetchApproveData = async (site, config) => {
    try {
        const response = await API.post(`/export/approve?site=${site}`, config, {
            responseType: 'blob'
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};
