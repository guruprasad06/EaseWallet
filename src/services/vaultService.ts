import axios from "axios";

const API_URL = "http://localhost:5000/api/vault";

export const vaultService = {
  getItems: async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  createItem: async (item: {
  title: string;
  type: string;
  content: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    item,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
},
};