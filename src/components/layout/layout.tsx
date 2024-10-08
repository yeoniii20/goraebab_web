'use client';

import React, { useState } from 'react';
import { Header, PanButtons, Sidebar, ZoomButtons } from '@/components';
import {
  IMAGE_CARD_DATA,
  CONTAINER_CARD_DATA,
  NETWORK_CARD_DATA,
  VOLUME_CARD_DATA,
} from '@/data/mock';
import AddHostButton from '../button/addHostButton';
import { SnackbarProvider } from 'notistack';
import SaveButton from '../button/saveButton';
import { useMenuStore } from '@/store/menuStore';
import DeleteBlueprintButton from '../button/deleteBlueprintButton';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { activeId } = useMenuStore();
  const [isHandMode, setIsHandMode] = useState(false);

  /**
   * activeId에 따른 카드 데이터 변경
   */
  let cardData: any[];
  switch (activeId) {
    case 1:
      cardData = CONTAINER_CARD_DATA;
      break;
    case 2:
      cardData = IMAGE_CARD_DATA;
      break;
    case 3:
      cardData = NETWORK_CARD_DATA;
      break;
    case 4:
      cardData = VOLUME_CARD_DATA;
      break;
    default:
      cardData = [];
      break;
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="relative flex h-screen bg-basic_1 overflow-hidden">
        <Header />
        <div className="flex flex-col flex-1 ml-[300px] mt-[56px]">
          {/* <div className="flex-1 overflow-y-auto bg-basic_1 p-4 bg-grey_0"> */}
          <div className="flex-1 bg-basic_1 bg-grey_0">
            <main className={`relative ${isHandMode ? 'hand-mode' : ''}`}>
              {children}
            </main>
            <div className="flex flex-col">
              {/* <ZoomButtons /> */}
              <Sidebar progress={30} />
              <PanButtons />
              <AddHostButton />
              <DeleteBlueprintButton />
              <SaveButton />
            </div>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default Layout;
