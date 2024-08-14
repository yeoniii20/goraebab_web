import React from 'react';
import { CardContainer, ConnectBar, HostCard } from '@/components';
import { HostCardProps } from './hostCard';
import Draggable from 'react-draggable';
import { useStore } from '@/store/cardStore';
import { selectedHostStore } from '@/store/seletedHostStore';
import { Container } from './cardContainer';

interface CardContainerProps {
  networkIp: string;
  containers: Container[];
}
interface CardSectionProps {
  hostData: HostCardProps[];
  containerData: CardContainerProps;
  isHandMode: boolean;
}

const CardSection = ({
  hostData,
  containerData,
  isHandMode,
}: CardSectionProps) => {
  const { selectedHostId } = selectedHostStore(); // 선택된 호스트 ID를 가져옴

  // Retrieve all containers at once, outside the map
  const allContainers = useStore((state) => state.hostContainers);

  const handleHostClick = (id: string) => {
    selectedHostStore.setState({
      selectedHostId: selectedHostId === id ? null : id,
    });
  };

  return (
    <Draggable disabled={!isHandMode}>
      <div className="flex">
        {hostData.map((host) => {
          const containers = allContainers[host.id] || []; // 해당 호스트의 컨테이너를 가져옴

          return (
            <div key={host.id} className="flex">
              <HostCard
                id={host.id}
                hostNm={host.hostNm}
                ip={host.ip}
                status={host.status}
                onClick={() => handleHostClick(host.id)}
                className={
                  selectedHostId === host.id ? 'scale-105 border-blue-500' : ''
                }
                isRemote={host.isRemote}
                themeColor={host.themeColor}
              />
              <ConnectBar themeColor={host.themeColor} />
              <CardContainer
                networkIp={containerData.networkIp}
                containers={containers} // 선택된 호스트의 컨테이너만 전달
                themeColor={host.themeColor}
              />
            </div>
          );
        })}
      </div>
    </Draggable>
  );
};

export default CardSection;
