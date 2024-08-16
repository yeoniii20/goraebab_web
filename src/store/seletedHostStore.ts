import create from 'zustand';

interface HostStoreState {
  selectedHostId: string | null;
  connectedBridgeIds: Record<string, string[]>; // 각 호스트에 대한 브릿지 연결 관리
  setSelectedHostId: (id: string | null) => void;
  addConnectedBridgeId: (hostId: string, bridgeId: string) => void;
  addHostWithDefaultNetwork: (hostId: string, defaultNetworkId: string) => void;
  removeConnectedBridgeId: (hostId: string, bridgeId: string) => void;
}

export const selectedHostStore = create<HostStoreState>((set) => ({
  selectedHostId: null,
  connectedBridgeIds: {}, // 초기에는 빈 객체로 시작

  setSelectedHostId: (id) => set({ selectedHostId: id }),

  addConnectedBridgeId: (hostId, bridgeId) =>
    set((state) => ({
      connectedBridgeIds: {
        ...state.connectedBridgeIds,
        [hostId]: [...(state.connectedBridgeIds[hostId] || []), bridgeId],
      },
    })),

  removeConnectedBridgeId: (hostId, bridgeId) =>
    set((state) => ({
      connectedBridgeIds: {
        ...state.connectedBridgeIds,
        [hostId]: (state.connectedBridgeIds[hostId] || []).filter(
          (id) => id !== bridgeId
        ),
      },
    })),

  addHostWithDefaultNetwork: (hostId, defaultNetworkId) =>
    set((state) => ({
      connectedBridgeIds: {
        ...state.connectedBridgeIds,
        [hostId]: [defaultNetworkId], // 기본 네트워크 추가
      },
    })),
}));
