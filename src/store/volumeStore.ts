import { create } from 'zustand';

interface Volume {
  id: string;
  name: string;
  driver: string;
  mountPoint: string;
  capacity: string;
  status: string;
  hostId?: string; // 연결된 호스트 ID
  containerIds?: string[]; // 연결된 컨테이너 ID들
}

interface VolumeStore {
  volumes: Volume[];
  addVolume: (volume: Volume) => void;
  assignVolumeToHost: (volumeId: string, hostId: string) => void;
  assignVolumeToContainer: (volumeId: string, containerId: string) => void;
}

export const useVolumeStore = create<VolumeStore>((set) => ({
  volumes: [],
  addVolume: (volume) =>
    set((state) => ({
      volumes: [...state.volumes, volume],
    })),
  assignVolumeToHost: (volumeId, hostId) =>
    set((state) => ({
      volumes: state.volumes.map((volume) =>
        volume.id === volumeId ? { ...volume, hostId } : volume
      ),
    })),
  assignVolumeToContainer: (volumeId, containerId) =>
    set((state) => ({
      volumes: state.volumes.map((volume) =>
        volume.id === volumeId
          ? {
              ...volume,
              containerIds: [...(volume.containerIds || []), containerId],
            }
          : volume
      ),
    })),
}));
