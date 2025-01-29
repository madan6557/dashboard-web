import { fetchAllApprovedPlants } from "../handlers/approvePlantsHandler";

export const getAllApprovedPlants = async (keyword, id_site, location) => { 
    try {
        const { data } = await fetchAllApprovedPlants(keyword, id_site);

        if (!Array.isArray(data)) {
            console.warn("Invalid data received:", data);
            return { data: [] }; // Jika `data` bukan array, kembalikan array kosong
        }

        // Define the desired columns
        const desiredColumns = ['id_plant', 'easting', 'northing', 'status', 'location'];

        // Filter and map data
        const filteredData = data
            .filter(item => 
                item && (!location || (item.location && item.location.toLowerCase() === location.toLowerCase()))
            )
            .map(item => {
                let filteredItem = {};
                desiredColumns.forEach(column => {
                    if (item.hasOwnProperty(column)) {
                        filteredItem[column] = item[column];
                    }
                });
                return filteredItem;
            });

        return { data: filteredData };
    } catch (error) {
        console.error("Error fetching plants:", error);
        return { data: [] }; // Jika ada error, kembalikan array kosong
    }
};