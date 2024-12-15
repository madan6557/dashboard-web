import API from '../config';

/**
 * Login pengguna
 * @param {object} credentials - Data login (email dan password)
 * @returns {Promise<object>} - Data respons dari server (misalnya token atau user info)
 */
export const login = async (credentials) => {
    try {
        const response = await API.post('/auth/login', credentials); // Endpoint: /auth/login
        const { token, user } = response.data;

        // Simpan token ke localStorage
        if (token) {
            localStorage.setItem('authToken', token);
        }

        return { token, user }; // Misalnya: { token, user }

    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

/**
 * Logout pengguna
 * @returns {Promise<void>} - Respons sukses logout
 */
export const logout = async () => {
    try {
        await API.post('/auth/logout'); // Endpoint: /auth/logout
        // Hapus token saat logout
        localStorage.removeItem('authToken');
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};

/**
 * Daftar pengguna baru
 * @param {object} userData - Data pengguna baru (nama, email, password, dll.)
 * @returns {Promise<object>} - Data pengguna yang terdaftar
 */
export const register = async (userData) => {
    try {
        const response = await API.post('/auth/register', userData); // Endpoint: /auth/register
        return response.data; // Misalnya: { id, name, email }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

/**
 * Mendapatkan data pengguna saat ini
 * @returns {Promise<object>} - Informasi pengguna (misalnya dari token)
 */
export const getCurrentUser = async () => {
    try {
        const response = await API.get('/auth/me'); // Endpoint: /auth/me
        return response.data; // Misalnya: { id, name, email }
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
};
