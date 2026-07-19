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

export const deleteUser = async(userId:string) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };
  export const updateUserRole = async (
  userId: string,
  role: string
) => {
  const token = localStorage.getItem("token");

 const response = await axios.put(
  `${API_URL}/${userId}/role`,
  { role },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

  return response.data;
};
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.user;
};
export const updatedUserStatus = async (
  userId: string,
  isSuspended: boolean
) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${API_URL}/${userId}/status`,
    { isSuspended },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const updateProfile = async (
  name: string,
  email: string,
  profileImage: string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/profile`,
    {
      name,
      email,
      profileImage,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/change-password`,
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};