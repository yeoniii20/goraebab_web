'use client';

import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { showSnackbar } from '@/utils/toastUtils';

interface HostModalProps {
  onClose: () => void;
  onSave: (id: string, hostNm: string, ip: string) => void;
}

const HostModal = ({ onClose, onSave }: HostModalProps) => {
  const id = uuidv4();

  const [hostNm, setHostNm] = useState('');
  const [ip, setIp] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    if (!hostNm) {
      showSnackbar(
        enqueueSnackbar,
        'Host 이름을 입력해주세요.',
        'error',
        '#FF4853'
      );
      return;
    }

    if (!ip) {
      showSnackbar(enqueueSnackbar, 'IP를 입력해주세요.', 'error', '#FF4853');
      return;
    }

    // 유효성 검사가 완료된 후 onSave 호출
    onSave(id, hostNm, ip);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-20" />
      <div className="relative bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Host</h2>
        <input
          type="text"
          placeholder="Host Name"
          value={hostNm}
          onChange={(e) => setHostNm(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="IP Address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Host
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostModal;
