'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal, OptionModal } from '@/components';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { showSnackbar } from '@/utils/toastUtils';
import { useSelectedNetworkStore } from '@/store/selectedNetworkStore';
import { useContainerStore } from '@/store/containerStore';
import { Volume, Image } from '@/types/type';
import { useStore } from '@/store/cardStore';
import { selectedHostStore } from '@/store/seletedHostStore';
import { getStatusColors } from '@/utils/statusColorsUtils';

interface CardProps {
  id: string;
  name: string;
  ip: string;
  size: string;
  tag: string;
  active: string;
  status: string;
  image: Image;
  volume?: Volume[];
  network?: string;
}

interface CardDataProps {
  data: CardProps;
  onSelectNetwork?: (networkName: string) => void;
}

/**
 *
 * @param data 컨테이너 정보
 * @param selectedHostId 선택한 호스트 id
 * @param selectedHostName 선택한 호스트 name
 * @returns
 */
const ContainerCard = ({ data }: CardDataProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { selectedNetwork } = useSelectedNetworkStore();
  const { selectedHostId, selectedHostName } = selectedHostStore();
  const addContainerToHost = useStore((state) => state.addContainerToHost);

  const cardRef = useRef<HTMLDivElement>(null);
  const { bg1, bg2 } = getStatusColors(data.status || 'primary');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { assignImageToContainer, assignNetworkToContainer } =
    useContainerStore();

  const items = [
    { label: 'ID', value: data.id },
    { label: 'NAME', value: data.name },
    { label: 'IMAGE', value: data.image?.name || 'N/A' },
    { label: 'NETWORK', value: data.network || 'N/A' },
    { label: 'TAGS', value: data.tag || 'N/A' },
  ];
  console.log(data);
  console.log('컨테이너 볼륨 데이터', data.volume);
  const handleOptionClick = () => {
    setShowOptions(!showOptions);
  };

  const handleGetInfo = () => {
    console.log('정보 가져오기 클릭됨');
    setShowOptions(false);
  };

  const handleRun = () => {
    if (!selectedNetwork) {
      showSnackbar(
        enqueueSnackbar,
        '네트워크를 선택해주세요.',
        'error',
        '#FF4853'
      );
      return;
    }

    if (selectedHostId) {
      const newContainer = {
        id: uuidv4(),
        name: data.name,
        ip: data.ip,
        size: data.size,
        tag: data.image?.tag || 'latest',
        active: data.active,
        status: 'running',
        network: selectedNetwork.networkName,
        image: data.image,
        volume: data.volume || [],
      };

      addContainerToHost(selectedHostId, newContainer);

      if (data.image) {
        assignImageToContainer(newContainer.id, data.image);
      } else {
        console.warn('Image information is missing for the container.');
      }

      assignNetworkToContainer(newContainer.id, selectedNetwork.hostId);

      showSnackbar(
        enqueueSnackbar,
        `호스트 ${selectedHostName}의 ${selectedNetwork.networkName} 네트워크에서 컨테이너가 실행되었습니다.`,
        'success',
        '#4C48FF'
      );
    } else {
      showSnackbar(
        enqueueSnackbar,
        '호스트를 선택해주세요.',
        'error',
        '#FF4853'
      );
    }
    setShowOptions(false);
  };

  const handleDelete = () => {
    setShowModal(true);
    setShowOptions(false);
  };

  const handleConfirmDelete = () => {
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
                onTopHandler={handleGetInfo}
                onMiddleHandler={handleRun}
                onBottomHandler={handleDelete}
              />
            </div>
          )}
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex items-center mt-[5px] space-x-3.5">
            <span
              className="text-xs py-1 w-[65px] rounded-md font-bold text-center"
              style={{ backgroundColor: bg1, color: bg2 }}
            >
              {item.label}
            </span>
            <span className="font-semibold text-xs truncate max-w-[150px]">
              {item.value}
            </span>
          </div>
        ))}
        {/* 볼륨 정보 표시 */}
        <div className="flex mt-2">
          <p
            className="text-xs py-1 w-[65px] h-6 mr-2 rounded-md font-bold text-center mb-2 flex-shrink-0"
            style={{ backgroundColor: bg1, color: bg2 }}
          >
            VOLUME
          </p>
          <div className="max-h-42 overflow-y-auto scrollbar-custom w-full flex-grow">
            {data.volume?.map((volume, index) => (
              <div
                key={index}
                className="flex flex-col mb-2 p-1 border rounded w-full"
              >
                <p className="text-xs font-semibold">{volume.name}</p>
                {volume.driver && (
                  <p className="text-xs">Driver: {volume.driver}</p>
                )}
                {volume.mountPoint && (
                  <p className="text-xs">Mount: {volume.mountPoint}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ContainerCard;
