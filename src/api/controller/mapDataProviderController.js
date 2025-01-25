import { fetchAllApprovedPlants } from "../handlers/approvePlantsHandler";

export const getAllApprovedPlants = async (keyword, id_site) => { 
    const {data} = await fetchAllApprovedPlants(keyword, id_site);

    // Define the desired columns
    const desiredColumns = ['id_plant', 'easting', 'northing', 'status'];

    // Filter the data to only include the desired columns and format plantingDate
    const filteredData = data.map(item => {
        let filteredItem = {};
        desiredColumns.forEach(column => {
            if (item.hasOwnProperty(column)) {
                filteredItem[column] = item[column];
            }
        });
        return filteredItem;
    });

    return {
        data: filteredData,
    };
};