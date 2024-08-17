'use client';

import React from 'react';
import { NETWORK_DATA } from '@/data/mock';
import CardSection from '@/components/card/cardSection';
import { TransformProvider } from '@/context/useTransformContext';
import useHandModeSubscription from '@/hook/useHandModeSubscription';
import { useHostStore } from '@/store/hostStore';

// Removed ContainerPageProps as it's not necessary
const ContainerPage = () => {
  const [isHandMode, setIsHandMode] = React.useState(false);

  // Zustand에서 hosts 데이터를 가져옵니다.
  const hosts = useHostStore((state) => state.hosts);
 
  // 상태가 변경될 때 실행할 로직을 정의합니다.
  useHandModeSubscription((newIsHandMode) => {
    setIsHandMode(newIsHandMode);
  });

  return (
    <TransformProvider>
      {hosts.length > 0 &&
        hosts.map((host, index) => (
          <CardSection key={index} hostData={[host]} isHandMode={isHandMode} />
        ))}
    </TransformProvider>
  );
};

export default ContainerPage;
