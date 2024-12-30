import { create } from "zustand";

export const useChangeStatusModal = create((set) => ({
  id: null,
  isOpen: false,
  onOpen: (id, action) => set({ id, action, isOpen: true }),
  onClose: () => set({ id: null, isOpen: false }),
}));
