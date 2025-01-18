import { fetchRejectedPlants, fetchRejectedPlantByID } from "../handlers/rejectedPlantsHandler";
import { dateFormat } from "../../utils/dateFormat";

export const searchRejectedPlants = async (config) => {
    const response = await fetchRejectedPlants(config);

    // Destructure the response to get data, totalPages, and currentPage
    const { data, totalPages, currentPage } = response;

    // Define the desired columns
    const desiredColumns = ['id_reject', 'id_plant', 'plant', 'activity', 'location', 'username', 'dateModified', 'action'];

    // Filter the data to only include the desired columns and format plantingDate
    const filteredData = data.map(item => {
        let filteredItem = {};
        desiredColumns.forEach(column => {
            if (item.hasOwnProperty(column)) {
                if (column === 'plantingDate' || column === 'dateModified') {
                    // Format plantingDate and dateModified
                    filteredItem[column] = dateFormat(item[column], 'dd-mm-yyyy hh-mm-ss', '-8');
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

export const getSelectedRejectedPlants = async (id_reject) => {
    const { data } = await fetchRejectedPlantByID(id_reject);

    if (data && data.plantingDate) {
        const formattedDate = dateFormat(data.plantingDate, 'yyyy-mm-dd hh-mm-ss', '+8')
        data.plantingDate = formattedDate;
    }

    return data;
}