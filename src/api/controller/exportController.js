import { fetchApproveData } from "../handlers/exportHandler";
import handleError from "../helper/errorHandler";

export const exportPlantData = async (config, signal) => {
    const { id_site } = config;
    try {
        const response = await fetchApproveData(id_site, config, signal);
        return response;
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Export failed:', error);
        } else {
            handleError(error);
            return null;
        }
    }
};
