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

  console.log('연결된 브릿지 ::', connectedBridgeIds);

  const handleHostClick = (id: string) => {
    selectedHostStore.setState({
      selectedHostId: selectedHostId === id ? null : id,
    });
  };

  return (
    <Draggable disabled={!isHandMode}>
      <div className="flex flex-col items-center">
        {hostData.map((host) => {
          const containers = allContainers[host.id] || [];
          const networks = connectedBridgeIds[host.id] || [];

          return (
            <div key={host.id} className="flex flex-col items-center">
              <div className="flex flex-row items-center">
                {/* 좌측에 위치할 네트워크 */}
                {networks.length > 0 && (
                  <div className="flex items-center">
                    <CardContainer
                      networkName={networks[0].name}
                      networkIp={networks[0].gateway}
                      containers={containers}
                      themeColor={host.themeColor}
                    />
                    <ConnectBar rotate={180} themeColor={host.themeColor} />
                  </div>
                )}

                {/* 호스트 카드 */}
                <HostCard
                  id={host.id}
                  hostNm={host.hostNm}
                  ip={host.ip}
                  status={host.status}
                  onClick={() => handleHostClick(host.id)}
                  className={
                    selectedHostId === host.id
                      ? 'scale-105 border-blue-500'
                      : ''
                  }
                  isRemote={host.isRemote}
                  themeColor={host.themeColor}
                  networkIp={host.networkIp}
                />

                {/* 우측에 위치할 네트워크 */}
                {networks.length > 1 && (
                  <div className="flex items-center">
                    <ConnectBar themeColor={host.themeColor} />
                    <CardContainer
                      networkName={networks[1].name}
                      networkIp={networks[1].gateway}
                      containers={containers}
                      themeColor={host.themeColor}
                    />
                  </div>
                )}
              </div>
              {/* 아래쪽에 위치할 네트워크 */}
              {networks.length > 2 && (
                <div className="flex flex-col items-center">
                  <ConnectBar rotate={90} themeColor={host.themeColor} />
                  <CardContainer
                    networkName={networks[2].name}
                    networkIp={networks[2].gateway}
                    containers={containers}
                    themeColor={host.themeColor}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Draggable>
  );
};

export default CardSection;
