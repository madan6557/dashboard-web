import { fetchApproveData } from "../handlers/exportHandler";
import handleError from "../helper/errorHandler";

export const exportPlantData = async (config) => {
    const { site } = config;
    try {
        const fileBlob = await fetchApproveData(site, config);
        return null;
    } catch (error) {
        handleError(error);
        return null;
    }
};