'use client';

import React, { createContext, useContext, useRef, useState } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';

interface TransformContextType {
  transformWrapperRef: React.MutableRefObject<ReactZoomPanPinchRef | null> | null;
  handleZoomChange: (scale: number) => void;
  isPanning: boolean;
  setPanning: (isPanning: boolean) => void;
}

const TransformContext = createContext<TransformContextType | null>(null);

export const TransformProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const transformWrapperRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [isPanning, setPanning] = useState(false);

  const handleZoomChange = (scale: number) => {
    console.log(`Zoom changed to ${scale}`);
  };

  return (
    <TransformContext.Provider
      value={{
        transformWrapperRef,
        handleZoomChange,
        isPanning,
        setPanning,
      }}
    >
      <TransformWrapper
        ref={transformWrapperRef}
        wheel={{ step: 0.1 }}
        doubleClick={{ mode: 'reset' }}
        initialScale={1}
        maxScale={3}
        minScale={0.7}
        centerOnInit
        panning={{ disabled: !isPanning }}
        onZoomStop={(ref) => handleZoomChange(ref.state.scale)}
      >
        <TransformComponent
          wrapperStyle={{
            width: '100vw',
            height: '100vh',
            position: 'relative',
          }}
        >
          {children}
        </TransformComponent>
      </TransformWrapper>
    </TransformContext.Provider>
  );
};

export const useTransformContext = () => {
  const context = useContext(TransformContext);
  if (!context) {
    throw new Error(
      'useTransformContext must be used within a TransformProvider'
    );
  }
  return context;
};
