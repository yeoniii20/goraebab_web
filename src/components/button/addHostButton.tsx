'use client';

import React, { useState } from 'react';
import HostModal from '../modal/host/hostModal';
import { useHostStore } from '@/store/hostStore';
import { useSnackbar } from 'notistack';
import { showSnackbar } from '@/utils/toastUtils';

const AddHostButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableNetworks, setAvailableNetworks] = useState<
    { name: string; ip: string }[]
  >([
    { name: 'bridge', ip: '172.17.0.1' },
    { name: 'host', ip: '192.168.1.1' },
    { name: 'custom-network', ip: '10.0.0.1' },
  ]); // 네트워크 상태 추가

  const { enqueueSnackbar } = useSnackbar();
  const addHost = useHostStore((state) => state.addHost);

  const handleAddHost = (
    id: string,
    hostNm: string,
    ip: string,
    isRemote: boolean,
    themeColor: {
      label: string;
      bgColor: string;
      borderColor: string;
      textColor: string;
    },
    networkName: string, // 추가된 네트워크 정보
    networkIp: string // 추가된 네트워크 IP
  ) => {
    const newHost = {
      id,
      hostNm,
      ip,
      status: true,
      isRemote,
      themeColor,
      networkName, // 네트워크 이름 저장
      networkIp, // 네트워크 IP 저장
    };

    // Zustand에 저장
    addHost(newHost);

    showSnackbar(
      enqueueSnackbar,
      '호스트가 성공적으로 추가되었습니다!',
      'success',
      '#4C48FF'
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-4 left-[445px] transform translate-x-4 w-[130px] h-[50px] p-3 bg-white rounded-lg shadow-lg flex items-center justify-between">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-blue_2 text-center"
        >
          Add Host
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        {isModalOpen && (
          <HostModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddHost}
            availableNetworks={availableNetworks} // 네트워크 목록 전달
          />
        )}
      </div>
    </>
  );
};

export default AddHostButton;
