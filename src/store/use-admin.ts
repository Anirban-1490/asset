import { create } from "zustand";

interface IAdminStore {
  isAdmin: boolean;
  setAdmin: (value: boolean) => void;
}

export const useAdmin = create<IAdminStore>((set) => ({
  isAdmin: false,
  setAdmin(value) {
    set({ isAdmin: value });
  },
}));
