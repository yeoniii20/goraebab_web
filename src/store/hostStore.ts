import { create } from 'zustand';

interface Host {
  id: string;
  hostNm: string;
  ip: string;
  status: boolean;
}

interface HostStore {
  hosts: Host[];
  addHost: (host: Host) => void;
}

export const useHostStore = create<HostStore>((set) => ({
  hosts: [],
  addHost: (host) =>
    set((state) => ({
      hosts: [...state.hosts, host],
    })),
}));
