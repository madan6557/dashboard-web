import { fetchApproveData } from "../handlers/exportHandler";
import handleError from "../helper/errorHandler";

export const exportPlantData = async (config) => {
    const { site } = config;
    try {
        const response = await fetchApproveData(site, config);
        return response;
    } catch (error) {
        handleError(error);
        return null;
    }
};