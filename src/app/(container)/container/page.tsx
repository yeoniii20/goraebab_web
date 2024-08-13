'use client';

import React, { useState } from 'react';
import { HOST_DATA, NETWORK_DATA } from '@/data/mock';
import CardSection from '@/components/card/cardSection';
import { TransformProvider } from '@/context/useTransformContext';
import useHandModeSubscription from '@/hook/useHandModeSubscription';
import { useHandModeStore } from '@/store/handModeStore';

const ContainerPage = () => {
  // const isHandMode = useHandModeStore.getState().isHandMode;

  // 상태가 변경될 때 실행할 로직을 정의합니다.
  useHandModeSubscription((newIsHandMode) => {
    if (newIsHandMode) {
      console.log('Hand mode is enabled');
      setIsHandMode(newIsHandMode);
      // Hand mode가 활성화되었을 때 실행할 로직
    } else {
      console.log('Hand mode is disabled');
      setIsHandMode(newIsHandMode);
      // Hand mode가 비활성화되었을 때 실행할 로직
    }
  });

  const [isHandMode, setIsHandMode] = useState(
    useHandModeStore.getState().isHandMode
  );

  console.log(isHandMode);

  return (
    <TransformProvider>
      <CardSection
        hostData={HOST_DATA}
        containerData={NETWORK_DATA}
        isHandMode={isHandMode}
      />
      <CardSection
        hostData={HOST_DATA}
        containerData={NETWORK_DATA}
        isHandMode={isHandMode}
      />
    </TransformProvider>
  );
};

export default ContainerPage;
