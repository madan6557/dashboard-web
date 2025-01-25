import API from '../service';

export const fetchSummaryDataset= async () => {
    try {
        const response = await API.get(`/analytic/summary`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};