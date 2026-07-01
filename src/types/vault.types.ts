export type VaultItem = {
  _id: string;
  id?: string;
  title: string;
  type: "note" | "image" | "document";
  content?: string;
  createdAt: string;
  updatedAt?: string;
  isPinned?: boolean;
};

export type VaultItemInput = {
  title: string;
  type: VaultItem["type"];
  content: string;
};
