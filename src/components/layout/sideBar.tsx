import React from 'react';
import { Button, Card, ProgressBar } from '@/components';

interface SidebarProps {
  data: any[];
  progress: number;
}

const Sidebar = ({ data, progress }: SidebarProps) => {
  return (
    <div className="fixed top-0 left-0 w-[300px] h-full flex flex-col bg-white p-4 border-r-2 border-grey_2 pt-20">
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
      <div className="flex-shrink-0">
        <ProgressBar progress={progress} />
        <Button title={'추가하기'} />
      </div>
    </div>
  );
};

export default Sidebar;
