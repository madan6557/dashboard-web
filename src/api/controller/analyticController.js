import { fetchSummaryDataset } from "../handlers/analyticHandler";


export const getPlantSummary = async () => {
    const response = await fetchSummaryDataset();
    return response.data;
};