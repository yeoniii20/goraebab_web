'use client';

import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { showSnackbar } from '@/utils/toastUtils';
import { v4 as uuidv4 } from 'uuid';

interface VolumeModalProps {
  onClose: () => void;
  onCreate: (
    id: string,
    name: string,
    driver: string,
    mountPoint: string,
    capacity: string
  ) => void;
}

const VolumeModal = ({ onClose, onCreate }: VolumeModalProps) => {
  const [name, setName] = useState<string>('');
  const [driver, setDriver] = useState<string>('local');
  const [mountPoint, setMountPoint] = useState<string>('/mnt/data');
  const [capacity, setCapacity] = useState<string>('10GB');
  const { enqueueSnackbar } = useSnackbar();

  const handleCreate = () => {
    if (!name) {
      showSnackbar(
        enqueueSnackbar,
        '볼륨 이름을 입력해주세요.',
        'error',
        '#FF4853'
      );
      return;
    }

    if (!mountPoint) {
      showSnackbar(
        enqueueSnackbar,
        '마운트 경로를 입력해주세요.',
        'error',
        '#FF4853'
      );
      return;
    }

    if (!capacity) {
      showSnackbar(
        enqueueSnackbar,
        '볼륨 용량을 입력해주세요.',
        'error',
        '#FF4853'
      );
      return;
    }

    const id = uuidv4(); // 볼륨 ID 생성
    onCreate(id, name, driver, mountPoint, capacity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Create Volume</h2>
        <input
          type="text"
          placeholder="Volume Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Mount Point (e.g., /mnt/data)"
          value={mountPoint}
          onChange={(e) => setMountPoint(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Capacity (e.g., 10GB)"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <select
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          className="mb-8 p-2 border border-gray-300 rounded w-full"
        >
          {/* 드라이버 옵션 */}
          <option value="local">Local</option>
          <option value="nfs">NFS</option>
          <option value="glusterfs">GlusterFS</option>
          <option value="ceph">Ceph</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolumeModal;
