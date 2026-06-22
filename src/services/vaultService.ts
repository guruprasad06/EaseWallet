import { vaultItems } from "../mock/vaultItems";

export const vaultService = {
  getItems: async () => {
    return vaultItems;
  },
};