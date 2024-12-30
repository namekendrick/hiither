import { create } from "zustand";

export const useChangeAccessModal = create((set) => ({
  id: null,
  isOpen: false,
  onOpen: (id, access) => set({ id, access, isOpen: true }),
  onClose: () => set({ id: null, isOpen: false }),
}));
