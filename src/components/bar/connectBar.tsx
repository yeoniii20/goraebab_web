import React from 'react';

interface ContainerBarProps {
  themeColor: {
    label: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
  };
}

const ConnectBar = ({ themeColor }: ContainerBarProps) => {
  return (
    <div className="flex items-start mt-5">
      <div
        className="h-6 brounded-br rounded-tr w-1"
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
