import React from 'react';
import { CardContainer, ConnectBar, HostCard } from '@/components';
import { CardContainerProps } from './cardContainer';
import { HostCardProps } from './hostCard';
import Draggable from 'react-draggable';

interface CardSectionProps {
  hostData: HostCardProps;
  containerData: CardContainerProps;
  isHandMode: boolean;
}

const CardSection = ({
  hostData,
  containerData,
  isHandMode,
}: CardSectionProps) => {
  return (
    <Draggable disabled={!isHandMode}>
      <div
        className="flex space-x-0"
        style={{ cursor: isHandMode ? 'grab' : 'default' }}
      >
        <HostCard
          hostNm={hostData.hostNm}
          ip={hostData.ip}
          status={hostData.status}
        />
        <ConnectBar />
        <CardContainer networkIp={containerData.networkIp} />
      </div>
    </Draggable>
  );
};

export default CardSection;
