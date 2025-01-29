import API from '../service';


export const fetchAllAccount = async (config) => {
  const {
    page,
    rows,
    orderBy,
    sort,
    search
  } = config;
  try {
    const response = await API.get(`/user/?keyword=${search}&orderBy=${orderBy}&sortBy=${sort}&page=${page}&limit=${rows}`);
    return response.data; // Data hasil response dari server
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Oper kesalahan ke pemanggil fungsi
  }
};


export const createAccount = async (data) => {
  try {
    const response = await API.post('/user/sign-up', data); // Endpoint: /users
    return response.message;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const requestPasswordReset = async (data) => {
  try {
    const response = await API.post(`/user/request-reset`, data);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; 
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await API.post(`/user/reset-password`, data);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; 
  }
};

export const fetchAccountByID = async (uuid) => {
  try {
    const response = await API.get(`/user/${uuid}`);
    return response.data; // Data hasil response dari server
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Oper kesalahan ke pemanggil fungsi
  }
};


export const updateAccountDetails = async (userId, data) => {
  try {
    const response = await API.patch(`/users/${userId}`, data);
    return response.message;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const updateAccountStatus = async (userId) => {
  try {
    const response = await API.delete(`/users/${userId}`); // Endpoint: /users/:id
    return response.message;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
