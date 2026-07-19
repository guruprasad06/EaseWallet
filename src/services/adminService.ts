import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getUsersWithDeletedFiles = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/recovery/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getDeletedFilesByUser = async (
  userId: string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/recovery/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const restoreDeletedFile = async (
  fileId: string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/recovery/restore/${fileId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const deleteDeletedFile = async (
  fileId: string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/recovery/delete/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};