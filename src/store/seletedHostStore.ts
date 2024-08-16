import { create } from 'zustand';

interface ContainerInfo {
  id: string;
  name: string;
  ip: string;
  status: string;
}

interface NetworkInfo {
  gateway: string;
  id: string;
  name: string;
  subnet: string;
  networkIp: string;
  driver: string;
  connectedContainers: ContainerInfo[]; // 연결된 컨테이너 정보 추가
}

interface HostStoreState {
  selectedHostId: string | null;
  connectedBridgeIds: Record<string, NetworkInfo[]>; // 각 호스트에 대한 브릿지 연결 관리
  setSelectedHostId: (id: string | null) => void;
  addConnectedBridgeId: (hostId: string, network: NetworkInfo) => void;
  addHostWithDefaultNetwork: (
    hostId: string,
    defaultNetwork: NetworkInfo
  ) => void;
  removeConnectedBridgeId: (hostId: string, bridgeId: string) => void;
}

export const selectedHostStore = create<HostStoreState>((set) => ({
  selectedHostId: null,
  connectedBridgeIds: {},

  setSelectedHostId: (id) => set({ selectedHostId: id }),

  addConnectedBridgeId: (hostId, network) =>
    set((state) => ({
      connectedBridgeIds: {
        ...state.connectedBridgeIds,
        [hostId]: [...(state.connectedBridgeIds[hostId] || []), network],
      },
    })),

  removeConnectedBridgeId: (hostId, bridgeId) =>
    set((state) => ({
      connectedBridgeIds: {
        ...state.connectedBridgeIds,
        [hostId]: (state.connectedBridgeIds[hostId] || []).filter(
          (network) => network.id !== bridgeId
        ),
      },
    })),

  addHostWithDefaultNetwork: (hostId, defaultNetwork) =>
    set((state) => ({
      connectedBridgeIds: {
        ...state.connectedBridgeIds,
        [hostId]: [defaultNetwork], // 기본 네트워크 추가
      },
    })),
}));
