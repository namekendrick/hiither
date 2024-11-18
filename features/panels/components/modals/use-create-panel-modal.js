import { create } from "zustand";

export const useCreatePanelModal = create((set) => ({
  id: null,
  isOpen: false,
  onOpen: (id) => set({ id: id, isOpen: true }),
  onClose: () => set({ id: null, isOpen: false }),
}));
