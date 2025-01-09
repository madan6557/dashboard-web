import { fetchPlants, fetchPlantByID, updatePlant, deletePlant } from "../handlers/approvePlantsHandler";
import { dateFormat } from "../../utils/dateFormat";

export const searchApprovedPlants = async (config) => {
    const response = await fetchPlants(config);

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
                    ? dateFormat(item[column], 'dd-mm-yyyy hh-mm-ss', '+0') // Format plantingDate
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

export const getSelectedApprovedPlants = async (id_plant, isEditable = false) => {
    const response = await fetchPlantByID(id_plant);

    if (response.data && response.data.plantingDate) {
        const formattedDate = dateFormat(response.data.plantingDate, 'yyyy-mm-dd hh-mm-ss', '+0')

        response.data.plantingDate = formattedDate;
    }

    return response.data;
}

export const patchApprovedPlants = async (id_plant, data) => {
    const response = await updatePlant(id_plant, data);
    return response;
}

export const deleteApprovedPlants = async (id_plant) => {
    const response = await deletePlant(id_plant);
    return response;
}