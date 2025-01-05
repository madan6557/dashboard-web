import { fetchPlants } from "../handlers/plants";
import { dateFormat } from "../../utils/dateFormat";

export const approvedPlants = async (config) => {
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
