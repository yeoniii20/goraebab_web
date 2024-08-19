import React from 'react';
import { CardContainer, ConnectBar, HostCard } from '@/components';
import { HostCardProps } from './hostCard';
import Draggable from 'react-draggable';
import { useStore } from '@/store/cardStore';
import { selectedHostStore } from '@/store/seletedHostStore';
import { useHostStore } from '@/store/hostStore';

interface CardSectionProps {
  hostData: HostCardProps[];
  isHandMode: boolean;
}

const CardSection = ({ hostData, isHandMode }: CardSectionProps) => {
  const { selectedHostId, connectedBridgeIds, deleteConnectedBridgeId } =
    selectedHostStore();
  const allContainers = useStore((state) => state.hostContainers);
  const deleteNetwork = useHostStore((state) => state.deleteNetwork);

  const handleHostClick = (id: string) => {
    selectedHostStore.setState({
      selectedHostId: selectedHostId === id ? null : id,
    });
  };

  const handleDeleteNetwork = (hostId: string, networkName: string) => {
    deleteNetwork(hostId, networkName);
    // connectedBridgeIds 업데이트
    deleteConnectedBridgeId(hostId, networkName);
  };

  return (
    <Draggable disabled={!isHandMode}>
      <div
        className="flex flex-col items-center"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {hostData.map((host) => {
          const containers = allContainers[host.id] || [];
          const networks = connectedBridgeIds[host.id] || [];

          return (
            <div key={host.id} className="flex flex-col items-center">
              <div className="flex flex-row items-center">
                {/* 좌측에 위치할 네트워크 */}
                {networks.length > 0 && (
                  <div className="flex items-center">
                    {/* 네트워크 삭제 버튼 */}
                    <button
                      onClick={() =>
                        handleDeleteNetwork(host.id, networks[0].name)
                      }
                      className="text-red-600 ml-2"
                    >
                      삭제
                    </button>
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
                    {/* 네트워크 삭제 버튼 */}
                    <button
                      onClick={() =>
                        handleDeleteNetwork(host.id, networks[1].name)
                      }
                      className="text-red-600 ml-2"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              {/* 아래쪽에 위치할 네트워크 */}
              {networks.length > 2 && (
                <div className="flex flex-col items-center">
                  <ConnectBar
                    rotate={90}
                    themeColor={host.themeColor}
                    length={'long'}
                  />
                  <CardContainer
                    networkName={networks[2].name}
                    networkIp={networks[2].gateway}
                    containers={containers}
                    themeColor={host.themeColor}
                  />
                  {/* 네트워크 삭제 버튼 */}
                  <button
                    onClick={() =>
                      handleDeleteNetwork(host.id, networks[2].name)
                    }
                    className="text-red-600 mt-2"
                  >
                    삭제
                  </button>
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
