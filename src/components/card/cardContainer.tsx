import React from 'react';

export interface Container {
  id: string;
  name?: string;
  ip?: string;
  active?: string;
}

export interface CardContainerProps {
  networkName: string;
  networkIp: string;
  containers: Container[];
  themeColor: {
    label: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
  };
}

const CardContainer = ({
  networkName,
  networkIp,
  containers,
  themeColor,
}: CardContainerProps) => {
  return (
    <div className="flex flex-col items-center p-[10px] border bg-white border-grey_3 rounded-lg shadow-lg w-[450px]">
      <div
        className="w-full text-center text-blue_2 border-2 p-2 rounded-md mb-3 text-sm font-semibold"
        style={{
          borderColor: `${themeColor.borderColor}`,
          backgroundColor: `${themeColor.bgColor}`,
          color: `${themeColor.textColor}`,
        }}
      >
        {/* 네트워크 IP 표시 */}
        {`${networkName} : ${networkIp}`}
      </div>
      {containers.length > 0 ? (
        <div className="w-full max-h-36 scrollbar-hide overflow-y-auto">
          {containers.map((container, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 mb-2 border rounded-md bg-gray-50"
            >
              <span>{container.name}</span>
              <div className="flex items-center space-x-4">
                <span>{container.ip}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    container.active === 'running'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CardContainer;
