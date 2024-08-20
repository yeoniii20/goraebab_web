'use client';

import React, { useState } from 'react';
import { Button, Card, ProgressBar } from '@/components';
import { selectedHostStore } from '@/store/seletedHostStore';
import AddBridgeButton from '../button/addBridgeButton';
import NetworkCard from '../card/networkCard';
import VolumeCard from '../card/volumeCard';
import AddVolumeButton from '../button/addVolumeButton';
import AddContainerButton from '../button/addContainerButton';
import AddImageButton from '../button/addImageButton';
import { useMenuStore } from '@/store/menuStore';

interface SidebarProps {
  data: any[];
  progress: number;
}

const Sidebar = ({ data, progress }: SidebarProps) => {
  const { selectedHostId } = selectedHostStore();
  const { activeId } = useMenuStore();

  const [networkData, setNetworkData] = useState<any[]>([]);
  const [volumeData, setVolumeData] = useState<any[]>([]);
  const [containerData, setContainerData] = useState<any[]>([]);
  const [imageData, setImageData] = useState<any[]>([]);

  const handleCreateNetwork = (newNetwork: any) => {
    setNetworkData((prevNetworks) => [...prevNetworks, newNetwork]);
  };

  const handleCreateVolume = (newVolume: any) => {
    setVolumeData((prevVolumes) => [...prevVolumes, newVolume]);
  };

  const handleCreateContainer = (newContainer: any) => {
    setContainerData((prevContainers) => [...prevContainers, newContainer]);
  };

  const handleCreateImage = (newImage: any) => {
    setImageData((prevImages) => [...prevImages, newImage]);
  };

  return (
    <div className="fixed top-0 left-0 w-[300px] h-full flex flex-col bg-white p-4 border-r-2 border-grey_2 pt-20">
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        {activeId === 1 ? (
          <>
            {containerData.length > 0 ? (
              containerData.map((container, index) => (
                <Card
                  key={index}
                  data={container}
                  selectedHostId={selectedHostId}
                />
              ))
            ) : (
              <p>컨테이너를 추가하세요</p>
            )}
          </>
        ) : activeId === 2 ? (
          <>
            {imageData.length > 0 ? (
              imageData.map((image, index) => (
                <Card
                  key={index}
                  data={image}
                  selectedHostId={selectedHostId}
                />
              ))
            ) : (
              <p>이미지를 추가하세요</p>
            )}
          </>
        ) : activeId === 3 ? (
          <>
            {networkData.length > 0 ? (
              networkData.map((network, index) => (
                <NetworkCard
                  key={index}
                  data={network}
                  selectedHostId={selectedHostId}
                />
              ))
            ) : (
              <p>네트워크 데이터를 추가하세요</p>
            )}
          </>
        ) : activeId === 4 ? (
          <>
            {volumeData.length > 0 ? (
              volumeData.map((volume, index) => (
                <VolumeCard
                  key={index}
                  data={volume}
                  selectedHostId={selectedHostId}
                />
              ))
            ) : (
              <p>볼륨 데이터를 추가하세요</p>
            )}
          </>
        ) : (
          <>
            {data.map((item, index) => (
              <Card key={index} data={item} selectedHostId={selectedHostId} />
            ))}
          </>
        )}
      </div>
      <div className="flex-shrink-0">
        <ProgressBar progress={progress} />
        {activeId === 1 ? (
          <AddContainerButton onCreate={handleCreateContainer} />
        ) : activeId === 2 ? (
          <AddImageButton onCreate={handleCreateImage} />
        ) : activeId === 3 ? (
          <AddBridgeButton onCreate={handleCreateNetwork} />
        ) : activeId === 4 ? (
          <AddVolumeButton onCreate={handleCreateVolume} />
        ) : (
          <Button title={'추가하기'} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
