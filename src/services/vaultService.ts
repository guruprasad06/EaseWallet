import axios from "axios";

const API_URL = "http://localhost:5000/api/vault";

const getToken = () => {
  return localStorage.getItem("token");
};

export const vaultService = {
  getItems: async () => {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  },

  createItem: async (item: any) => {
    const response = await axios.post(API_URL, item, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  },

  deleteItem: async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  },
};