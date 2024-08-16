import React from 'react';
import { CardContainer, ConnectBar, HostCard } from '@/components';
import { HostCardProps } from './hostCard';
import Draggable from 'react-draggable';
import { useStore } from '@/store/cardStore';
import { selectedHostStore } from '@/store/seletedHostStore';

interface CardSectionProps {
  hostData: HostCardProps[];
  isHandMode: boolean;
}

const CardSection = ({ hostData, isHandMode }: CardSectionProps) => {
  const { selectedHostId, connectedBridgeIds } = selectedHostStore();
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
          const containers = allContainers[host.id] || [];
          const networks = connectedBridgeIds[host.id] || [];

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
                networkIp={host.networkIp}
              />
              <ConnectBar themeColor={host.themeColor} />
              {networks.map((network) => (
                <div key={network.id} className="flex flex-col">
                  <CardContainer
                    networkName={network.name}
                    networkIp={network.gateway}
                    containers={containers}
                    themeColor={host.themeColor}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Draggable>
  );
};

export default CardSection;
