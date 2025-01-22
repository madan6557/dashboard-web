import { fetchUnverifiedPlants, compareUnverifiedPlantByID, updatePlantVerification, fetchPlantsHistory, fetchPlantHistoryById } from "../handlers/verificationPlantsHandler";
import { dateFormat } from "../../utils/dateFormat";
import { base64ToBlobUrl } from "../../utils/base64ToBlobUrl";

export const searchPlantsHistory = async (config) => {
    const response = await fetchPlantsHistory(config);

    // Destructure the response to get data, totalPages, and currentPage
    const { data, totalPages, currentPage } = response;

    // Define the desired columns
    const desiredColumns = ['id_verification', 'id_plant', 'plant', 'activity', 'location', 'username', 'dateModified', 'action'];


    // Filter the data to only include the desired columns and format plantingDate and dateModified
    const filteredData = data.map(item => {
        let filteredItem = {};
        desiredColumns.forEach(column => {
            if (item.hasOwnProperty(column)) {
                if (column === 'plantingDate' || column === 'dateModified') {
                    // Format plantingDate and dateModified
                    filteredItem[column] = dateFormat(item[column], 'dd-mm-yyyy hh-mm-ss');
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

export const getSelectedPlantHistoryById = async (id_verification) => {
    const { data, imageBase64 } = await fetchPlantHistoryById(id_verification);

    if (data && data.plantingDate) {
        const formattedDate = dateFormat(data.plantingDate, 'yyyy-mm-dd hh-mm-ss')
        data.plantingDate = formattedDate;
    }

    const imageBlob = await base64ToBlobUrl(imageBase64);

    return { data, imageBlob };
}

export const searchUnverifedPlants = async (config) => {
    const response = await fetchUnverifiedPlants(config);

    // Destructure the response to get data, totalPages, and currentPage
    const { data, totalPages, currentPage } = response;

    // Define the desired columns
    const desiredColumns = ['id_verification', 'id_plant', 'plant', 'activity', 'location', 'username', 'dateModified', 'action'];


    // Filter the data to only include the desired columns and format plantingDate and dateModified
    const filteredData = data.map(item => {
        let filteredItem = {};
        desiredColumns.forEach(column => {
            if (item.hasOwnProperty(column)) {
                if (column === 'plantingDate' || column === 'dateModified') {
                    // Format plantingDate and dateModified
                    filteredItem[column] = dateFormat(item[column], 'dd-mm-yyyy hh-mm-ss');
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

export const compareSelectedVerificationPlants = async (id_verification) => {
    const response = await compareUnverifiedPlantByID(id_verification);

    const { verification } = response.data;
    const approve = response.data.approve ? response.data.approve : null;

    if (verification) {
        verification.plantingDate = dateFormat(verification.plantingDate, 'yyyy-mm-dd hh-mm-ss')
        verification.dateModified = dateFormat(verification.dateModified, 'yyyy-mm-dd hh-mm-ss')
        if (approve) {
            approve.plantingDate = dateFormat(approve.plantingDate, 'yyyy-mm-dd hh-mm-ss')
            approve.dateModified = dateFormat(approve.dateModified, 'yyyy-mm-dd hh-mm-ss')
        }
    }

    return { verification, approve };
}

export const verifyPlant = async (id_verification, data) => {
    const response = await updatePlantVerification(id_verification, data);
    return response;
}