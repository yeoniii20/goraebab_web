'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal, OptionModal } from '@/components';
import { useSnackbar } from 'notistack';
import { selectedHostStore } from '@/store/seletedHostStore';

interface VolumeProps {
  id: string;
  name: string;
  driver: string;
  mountPoint: string;
  capacity: string;
  status: string;
  connectedContainers?: {
    id: string;
    name: string;
    ip: string;
    status: string;
  }[];
}

interface VolumeCardProps {
  data: VolumeProps;
  selectedHostId: string | null;
}

const getStatusColors = (status: string) => {
  switch (status) {
    case 'Available':
      return { bg1: '#d1f6e2', bg2: '#25BD6B' };
    case 'In Use':
      return { bg1: '#f6e3d1', bg2: '#FFA048' };
    case 'Error':
      return { bg1: '#f6d4d6', bg2: '#FF4853' };
    default:
      return { bg1: '#d1d1d1', bg2: '#7F7F7F' };
  }
};

const VolumeCard = ({ data, selectedHostId }: VolumeCardProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { bg1, bg2 } = getStatusColors(data.status);
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = () => {
    setShowModal(true);
    setShowOptions(false);
  };

  const handleConfirmDelete = () => {
    console.log('볼륨 삭제가 확인되었습니다.');
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cardRef]);

  const volumeItems = [
    { label: 'Name', value: data.name },
    { label: 'Driver', value: data.driver },
    { label: 'Mount Point', value: data.mountPoint },
    { label: 'Capacity', value: data.capacity },
    {
      label: 'Containers',
      value:
        (data.connectedContainers || [])
          .map((container) => `${container.name} (${container.ip})`)
          .join(', ') || 'No connected containers',
    },
  ];

  return (
    <div
      ref={cardRef}
      className="relative flex items-start px-3 pt-1 pb-3 bg-grey_0 shadow rounded-lg mb-4"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-2.5 rounded-l-lg"
        style={{ backgroundColor: bg2 }}
      />
      <div className="ml-4 flex flex-col w-full">
        <div className="flex justify-end text-grey_4 text-sm mb-3 relative">
          <span
            className="font-semibold text-xs cursor-pointer"
            onClick={handleOptionClick}
          >
            •••
          </span>
          {showOptions && (
            <div className="absolute top-4 left-16">
              <OptionModal
                onTopHandler={() => console.log('정보 가져오기 클릭됨')}
                onMiddleHandler={() => console.log('기타 작업')}
                onBottomHandler={handleDelete}
              />
            </div>
          )}
        </div>
        {volumeItems.map((item, index) => (
          <div key={index} className="flex items-center mt-[5px] space-x-3">
            <span
              className="text-xs py-1.5 w-[70px] rounded-md font-bold text-center"
              style={{ backgroundColor: bg1, color: bg2 }}
            >
              {item.label}
            </span>
            <span className="font-semibold text-xs truncate max-w-[150px]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default VolumeCard;
