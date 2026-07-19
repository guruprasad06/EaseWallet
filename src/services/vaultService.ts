import axios from "axios";
import type { VaultItem, VaultItemInput } from "../types/vault.types";

const API_URL = "http://localhost:5000/api/vault";

const getToken = () => {
  return localStorage.getItem("token");
};

export const vaultService = {
getItems: async (page = 1, limit = 12) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
},
  createItem: async (item: VaultItemInput): Promise<VaultItem> => {
    const response = await axios.post(API_URL, item, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  },

  deleteItem: async (id: string): Promise<VaultItem> => {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  },
  getRecycleBin: async () => {
  const response = await axios.get(`${API_URL}/recycle-bin`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
},
restoreItem: async (id: string) => {
  const response = await axios.put(
    `${API_URL}/restore/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
},
permanentDelete: async (id: string) => {
  const response = await axios.delete(
    `${API_URL}/permanent/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
},

  updateItem: async (id: string, item: VaultItemInput): Promise<VaultItem> => {
    const response = await axios.put(`${API_URL}/${id}`, item, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  },
  pinItem: async (id: string): Promise<VaultItem> => {
  const response = await axios.patch(
    `${API_URL}/${id}/pin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
},

  uploadFile: async (file: File): Promise<VaultItem> => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      `${API_URL}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  },
};
