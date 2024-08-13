import { create } from 'zustand';

interface HostStoreState {
  selectedHostId: string | null;
  setSelectedHostId: (id: string | null) => void;
}

export const selectedHostStore = create<HostStoreState>((set) => ({
  selectedHostId: null,
  setSelectedHostId: (id) => set({ selectedHostId: id }),
}));
