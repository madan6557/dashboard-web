import { fetchPlants, fetchPlantByID, updatePlant, deletePlant } from "../handlers/verificationPlantsHandler";
import { dateFormat } from "../../utils/dateFormat";

export const searchVerificationPlants = async (config) => {
    const response = await fetchPlants(config);

    // Destructure the response to get data, totalPages, and currentPage
    const { data, totalPages, currentPage } = response;

    // Define the desired columns
    const desiredColumns = ['id_plant', 'plant', 'plantingDate', 'activity', 'location', 'status', 'username', 'dateModified'];

    // Filter the data to only include the desired columns and format plantingDate and dateModified
    const filteredData = data.map(item => {
        let filteredItem = {};
        desiredColumns.forEach(column => {
            if (item.hasOwnProperty(column)) {
                if (column === 'plantingDate' || column === 'dateModified') {
                    // Format plantingDate and dateModified
                    filteredItem[column] = dateFormat(item[column], 'dd-mm-yyyy hh-mm-ss', '+0');
                } else {
                    filteredItem[column] = item[column];
                }
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

export const getSelectedVerificationPlants = async (id_plant, isEditable = false) => {
    const response = await fetchPlantByID(id_plant);

    if (response.data && response.data.plantingDate) {
        const formattedDate = dateFormat(response.data.plantingDate, 'yyyy-mm-dd hh-mm-ss', '+0')

        response.data.plantingDate = formattedDate;
    }

    return response.data;
}

export const approvePlants = async (id_plant, data) => {
    const response = await updatePlant(id_plant, data);
    return response;
}

export const rejectPlants = async (id_plant) => {
    const response = await deletePlant(id_plant);
    return response;
}