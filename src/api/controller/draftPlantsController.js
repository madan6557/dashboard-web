import { fetchDraftPlants, fetchDraftPlantByID } from "../handlers/draftPlantsHandler";
import { dateFormat } from "../../utils/dateFormat";
import { base64ToBlobUrl } from "../../utils/base64ToBlobUrl";

export const searchDraftPlants = async (config) => {
    const response = await fetchDraftPlants(config);

    const { data, totalPages, currentPage } = response;

    const desiredProgressColumns = [
        'plant', 
        'plantingDate', 
        'activity',
        'skppkh', 
        'height', 
        'diameter', 
        'status', 
        'plot',
        'easting',
        'northing',
        'elevation',
        'images'
    ];

    const desiredColumns = ['id_draft', 'id_plant', 'plant', 'activity', 'location', 'username', 'dateModified'];

    const filteredData = data.map(item => {
        let filteredItem = {};

        desiredColumns.forEach(column => {
            if (item.hasOwnProperty(column)) {
                if (column === 'plantingDate' || column === 'dateModified') {
                    filteredItem[column] = dateFormat(item[column], 'dd-mm-yyyy hh-mm-ss', '+0');
                } else {
                    filteredItem[column] = item[column];
                }
            }
        });

        // Hitung progress berdasarkan jumlah kolom yang terisi valid
        const filledColumns = desiredProgressColumns.filter(column => {
            const value = item[column];
            return value !== null && value !== undefined && value !== "" && value !== 0;
        }).length;

        const progressPercentage = ((filledColumns / desiredProgressColumns.length) * 100).toFixed(2) + '%';

        // Tambahkan properti progress ke hasil akhir
        filteredItem.progress = progressPercentage;

        return filteredItem;
    });

    return {
        data: filteredData,
        totalPages,
        currentPage
    };
};

export const getSelectedDraftPlants = async (id_draft) => {
    const { data, imageBase64 } = await fetchDraftPlantByID(id_draft);

    if (data && data.plantingDate) {
        const formattedDate = dateFormat(data.plantingDate, 'yyyy-mm-dd hh-mm-ss')
        data.plantingDate = formattedDate;
    }

     const imageBlob = await base64ToBlobUrl(imageBase64);

     return { data, imageBlob };
}