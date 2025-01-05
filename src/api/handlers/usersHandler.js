import API from '../service';

// Mendapatkan semua pengguna
export const fetchUsers = async () => {
  try {
    const response = await API.get(`/user/?keyword=&orderBy=uuid&sortBy=ASC&page=${page}&limit=${rows}`); // Endpoint: /users
    return response.data; // Data hasil response dari server
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Oper kesalahan ke pemanggil fungsi
  }
};

// Update data pengguna
export const updateUser = async (userId, data) => {
  try {
    const response = await API.patch(`/users/${userId}`, data);
    return response.message;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Menambahkan pengguna baru
export const createUser = async (data) => {
  try {
    const response = await API.post('/users', data); // Endpoint: /users
    return response.message;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Menghapus pengguna berdasarkan ID
export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`/users/${userId}`); // Endpoint: /users/:id
    return response.message;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
