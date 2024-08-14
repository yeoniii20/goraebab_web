'use client';

import React, { useState } from 'react';
import { Button, Card, ProgressBar } from '@/components';
import { selectedHostStore } from '@/store/seletedHostStore';
import AddBridgeButton from '../button/addBridgeButton';
import NetworkCard from '../card/networkCard';
import { useMenuStore } from '@/store/store';

interface SidebarProps {
  data: any[];
  progress: number;
}

const Sidebar = ({ data, progress }: SidebarProps) => {
  const { selectedHostId } = selectedHostStore();
  const { activeId } = useMenuStore();

  const [networkData, setNetworkData] = useState<any>(null);
  console.log('networkData', networkData, '');

  const handleCreateNetwork = (newNetwork: any) => {
    console.log(newNetwork);
    setNetworkData(newNetwork);
  };

  return (
    <div className="fixed top-0 left-0 w-[300px] h-full flex flex-col bg-white p-4 border-r-2 border-grey_2 pt-20">
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        {activeId === 3 ? (
          <>
            {networkData ? (
              <NetworkCard data={networkData} selectedHostId={selectedHostId} />
            ) : (
              <p>네트워크 데이터를 추가하세요</p>
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
        {/* <Button title={'추가하기'} /> */}
        {activeId === 3 ? (
          <AddBridgeButton onCreate={handleCreateNetwork} />
        ) : (
          <Button title={'추가하기'} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
