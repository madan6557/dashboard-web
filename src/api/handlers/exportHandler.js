import API from '../service';

export const fetchApproveData = async (site, config, signal) => {
    try {
        const response = await API.post(`/export/approve?id_site=${site}`, config, {
            responseType: 'blob',
            signal: signal // Tambahkan signal di sini
        });
        return response.data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request was aborted');
        } else {
            console.error('Failed to export data:', error);
        }
        throw error;
    }
};
