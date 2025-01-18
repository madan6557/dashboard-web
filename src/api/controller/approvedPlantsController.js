import { fetchApprovedPlants, fetchApprovedPlantByID, updateApprovedPlant, deleteApprovedPlant } from "../handlers/approvePlantsHandler";
import { dateFormat } from "../../utils/dateFormat";
import { base64ToBlobUrl } from "../../utils/base64ToBlobUrl";

export const searchApprovedPlants = async (config) => {
    const response = await fetchApprovedPlants(config);

    // Destructure the response to get data, totalPages, and currentPage
    const { data, totalPages, currentPage } = response;

    // Define the desired columns
    const desiredColumns = ['id_plant', 'plant', 'plantingDate', 'activity', 'location', 'status'];

    // Filter the data to only include the desired columns and format plantingDate
    const filteredData = data.map(item => {
        let filteredItem = {};
        desiredColumns.forEach(column => {
            if (item.hasOwnProperty(column)) {
                filteredItem[column] = column === 'plantingDate'
                    ? dateFormat(item[column], 'dd-mm-yyyy hh-mm-ss', '+8') // Format plantingDate
                    : item[column];
            }
        });
        return filteredItem;
    });

    return {
        data: filteredData,
        totalPages,
        currentPage
    };
};

export const getSelectedApprovedPlants = async (id_plant) => {
    const { data, imageBase64 } = await fetchApprovedPlantByID(id_plant);

    if (data && data.plantingDate) {
        const formattedDate = dateFormat(data.plantingDate, 'yyyy-mm-dd hh-mm-ss', '+8')
        data.plantingDate = formattedDate;
    }

    const imageBlob = await base64ToBlobUrl(imageBase64);

    return { data, imageBlob };
}

export const patchApprovedPlants = async (id_plant, data) => {
    const response = await updateApprovedPlant(id_plant, data);
    return response;
}

export const deleteApprovedPlants = async (id_plant) => {
    const response = await deleteApprovedPlant(id_plant);
    return response;
}