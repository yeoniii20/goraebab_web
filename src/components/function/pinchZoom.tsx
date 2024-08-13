'use client';

import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const PinchZoom = () => (
  <TransformWrapper maxScale={4} minScale={0.5}>
    <TransformComponent>
      <div
        style={{
          width: '800px',
          height: '600px',
          backgroundColor: 'lightgray',
        }}
      >
        <h1>Pinch to Zoom</h1>
      </div>
    </TransformComponent>
  </TransformWrapper>
);

export default PinchZoom;
