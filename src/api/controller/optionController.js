import { fetchOptions } from "../../api/handlers/optionHandler";

export const getDataOptions = async () => {
    try {
        const response = await fetchOptions();

        // Helper function to format the options
        const formatOptions = (array, textKey, valueKey) => {
            return array.map(item => ({
                text: item[textKey],
                value: item[valueKey]
            }));
        };

        // Process each tb_ array into the desired format
        const dataOption = {
            tb_site: formatOptions(response.tb_site, 'site', 'site'),
            tb_species: formatOptions(response.tb_species, 'plant', 'id_species'),
            tb_activity: formatOptions(response.tb_activity, 'activity', 'id_activity'),
            tb_location: formatOptions(response.tb_location, 'location', 'id_location'),
            tb_action: formatOptions(response.tb_action, 'action', 'id_action'),
            tb_areaStatus: formatOptions(response.tb_areaStatus, 'areaStatus', 'id_areaStatus'),
            tb_rehabilitationPlot: formatOptions(response.tb_rehabilitationPlot, 'rehabilitationPlot', 'id_rehabilitationPlot'),
            tb_sk: formatOptions(response.tb_sk, 'skppkh', 'id_sk'),
            tb_status: formatOptions(response.tb_status, 'status', 'id_status'),
            tb_workDecree: formatOptions(response.tb_workDecree, 'workDecree', 'id_workDecree')
        };
        return dataOption;
    } catch (error) {
        console.error("Error fetching options:", error);
    }
};
