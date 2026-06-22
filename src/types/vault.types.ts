export type VaultItem = {
  id: string;
  title: string;
  type: "note" | "image" | "document";
  createdAt: string;
};