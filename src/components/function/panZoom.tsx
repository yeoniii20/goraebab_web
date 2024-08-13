"use client"

import React, { useState } from 'react';
import { TransformProvider } from '@/context/useTransformContext';
import { TransformComponent, useTransformContext } from 'react-zoom-pan-pinch';
import PanButtons from '../button/panButtons';
import ZoomButtons from '../button/zoomButtons';
import DraggableComponent from '../drag/draggableComponent';

const PanZoom = () => {
  const [isHandMode, setIsHandMode] = useState(false);

  return (
    <>
      {/* <TransformProvider> */}
      {/* <ZoomButtons />
      <PanButtons /> */}
      {/* <TransformComponent
        wrapperStyle={{
          width: '1600px',
          height: '1200px',
          backgroundColor: 'lightblue',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: isHandMode ? 'grabbing' : 'default',
        }}
      > */}
      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
        }}
      >
        <DraggableComponent isHandMode={isHandMode} />
      </div>
      {/* </TransformComponent> */}
      {/* </TransformProvider> */}
    </>
  );
};

export default PanZoom;
