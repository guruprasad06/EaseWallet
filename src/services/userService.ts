import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteUsers = async(userId:string) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };