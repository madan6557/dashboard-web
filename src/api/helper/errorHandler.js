import { logout } from '../handlers/authHandler';

// Utility function to handle errors and navigate on specific status
const handleError = (error) => {
    if (error.response) {
        if (error.response.status === 403) {
            logout(); // Navigate to /landing on 403 error
        } else {
            console.error('Error response status:', error.response.status);
            throw error; // Rethrow the error if it's not 403
        }
    } else {
        console.error('Error without response:', error);
        throw error; // Rethrow the error for non-response errors
    }
};

export default handleError;
