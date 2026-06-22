export const authService = {
  login: async () => {
    return {
      id: "1",
      name: "Demo User",
      email: "demo@easewallet.com",
      role: "user",
    };
  },

  register: async () => {
    return {
      success: true,
    };
  },
};