'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { showSnackbar } from '@/utils/toastUtils';

interface ContainerModalProps {
  onClose: () => void;
  onSave: (containerData: any) => void;
}

const ContainerModal = ({ onClose, onSave }: ContainerModalProps) => {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [size, setSize] = useState('');
  const [tags, setTags] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    if (!name || !ip || !size) {
      showSnackbar(
        enqueueSnackbar,
        '모든 필드를 입력해주세요.',
        'error',
        '#FF4853'
      );
      return;
    }

    const newContainer = {
      id: uuidv4(),
      name,
      ip,
      size,
      tags,
      active: 'running',
      status: 'primary',
    };

    onSave(newContainer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Container</h2>
        <input
          type="text"
          placeholder="Container Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="IP Address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Size (MB)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
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
            Add Container
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainerModal;
