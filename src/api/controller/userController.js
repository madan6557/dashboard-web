import { createAccount, fetchAllAccount, requestPasswordReset, resetPassword } from "../handlers/usersHandler";

export const getAllAccount = async (config) => {
    const response = await fetchAllAccount(config);

    // Destructuring the response to get data, totalPages, and currentPage
    const { data, totalPages, currentPage } = response;

    // Define the desired columns
    const desiredColumns = ['uuid','email', 'username', 'role'];

    // Filter the data to only include the desired columns and add the status column
    const filteredData = data.map(item => {
        let filteredItem = {};

        // Add desired columns to the filteredItem
        desiredColumns.forEach(column => {
            if (item.hasOwnProperty(column)) {
                filteredItem[column] = item[column];
            }
        });

        // Add the 'status' column based on 'userStatus'
        filteredItem['status'] = item.userStatus ? 'Active' : 'Non-Active';

        return filteredItem;
    });

    return {
        data: filteredData, // Return the filtered data
        totalPages,
        currentPage
    };
};

export const addNewAccount = async (data) => {
    const response = await createAccount(data);

    return response;
}

export const sendResetPasswordRequest = async (data) => {
    const response = await requestPasswordReset(data);

    return response;
}

export const sendNewPassword = async (data) => {
    const response = await resetPassword(data);
    return response;
}