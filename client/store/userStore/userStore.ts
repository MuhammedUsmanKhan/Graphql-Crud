import { create } from "zustand";

type UserStore = {
  userId: string;
  updateModalPopup: boolean;
  deleteModalPopup: boolean;
  setUserId: (userId: string) => void;
  setUpdateModalPopup: (boolean: boolean) => void;
  setDeleteModalPopup: (boolean: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userId: "",
  setUserId: (userId) => set({ userId }),
  updateModalPopup: false,
  deleteModalPopup: false,
  setUpdateModalPopup: (updateModalPopup) => set({ updateModalPopup }),
  setDeleteModalPopup: (deleteModalPopup) => set({ deleteModalPopup }),
}));
