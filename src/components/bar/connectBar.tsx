import React from 'react';

interface ContainerBarProps {
  rotate?: number | 0;
  themeColor: {
    label: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
  };
}

const ConnectBar = ({ rotate, themeColor }: ContainerBarProps) => {
  const rotationStyle = {
    transform: `rotate(${rotate}deg)`,
  };

  return (
    <div className={`flex items-start mt-0.5`} style={rotationStyle}>
      <div
        className="h-6 rounded-br rounded-tr w-1"
        style={{ backgroundColor: `${themeColor.borderColor}` }}
      />
      <div
        className="w-6 h-[1px] mt-3"
        style={{ backgroundColor: `${themeColor.borderColor}` }}
      />
    </div>
  );
};

export default ConnectBar;
