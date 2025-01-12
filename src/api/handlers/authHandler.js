import API from '../service';

/**
 * Login pengguna
 * @param {object} credentials - Data login (email dan password)
 * @returns {Promise<object>} - Data respons dari server (misalnya token atau user info)
 */
export const login = async (credentials) => {
    try {
        const response = await API.post('/user/login/admin', credentials); // Endpoint: /auth/login
        const { token, uuid, role, message } = response.data;

        // Simpan token ke localStorage
        if (token) {
            localStorage.setItem('authToken', token);
            console.log(token);
            localStorage.setItem('userId', uuid);
            localStorage.setItem('userRole', role);
        }

        return { message }; // Misalnya: { token, user }

    } catch (error) {
        console.error('Failed to login:', error);
        throw error;
    }
};

/**
 * Logout pengguna
 * @returns {Promise<void>} - Respons sukses logout
 */
export const logout = async () => {
    try {
        // await API.post('/auth/logout'); 
        // Hapus token saat logout
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
    } catch (error) {
        console.error('Failed to logout:', error);
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
        const response = await API.post('/user/sign-up', userData); // Endpoint: /auth/register
        return response.data; // Misalnya: { id, name, email }
    } catch (error) {
        console.error('Failed to register:', error);
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
        console.error('Error fetching user:', error);
        throw error;
    }
};
