import { fetchOptions } from "../../api/handlers/optionHandler";

export const getDataOptions = async () => {
    try {
        const response = await fetchOptions();

        // Helper function to format the options with a placeholder
        const formatOptions = (array, textKey, valueKey, placeholder) => {
            // Add the placeholder option as the first element
            const formattedArray = array.map(item => ({
                text: item[textKey],
                value: item[valueKey]
            }));
            
            // Insert the placeholder at the beginning
            if (placeholder) {
                formattedArray.unshift({
                    text: placeholder,
                    value: ""
                });
            }
            
            return formattedArray;
        };

        // Process each tb_ array into the desired format with placeholders where needed
        const dataOption = {
            tb_site: formatOptions(response.tb_site, 'site', 'id_site'),
            tb_species: formatOptions(response.tb_species, 'plant', 'id_species'),
            tb_activity: formatOptions(response.tb_activity, 'activity', 'id_activity'),
            tb_location: formatOptions(response.tb_location, 'location', 'id_location'),
            tb_action: formatOptions(response.tb_action, 'action', 'id_action'),
            tb_areaStatus: formatOptions(response.tb_areaStatus, 'areaStatus', 'id_areaStatus', '--Area Status--'),
            tb_rehabilitationPlot: formatOptions(response.tb_rehabilitationPlot, 'rehabilitationPlot', 'id_rehabilitationPlot'),
            tb_sk: formatOptions(response.tb_sk, 'skppkh', 'id_sk'),
            tb_status: formatOptions(response.tb_status, 'status', 'id_status'),
            tb_workDecree: formatOptions(response.tb_workDecree, 'workDecree', 'id_workDecree', '--Work Decree--')
        };
        return dataOption;
    } catch (error) {
        console.error("Error fetching options:", error);
    }
};
