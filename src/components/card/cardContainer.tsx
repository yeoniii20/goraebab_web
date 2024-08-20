import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

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
  onDelete?: () => void;
}

const CardContainer = ({
  networkName,
  networkIp,
  containers,
  themeColor,
  onDelete,
}: CardContainerProps) => {
  return (
    <div className="relative flex flex-col items-center p-[10px] border bg-white border-grey_3 rounded-lg shadow-lg w-[450px] transition-colors duration-200">
      {/* 삭제 버튼 */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 hover:text-gray-500 transition-colors duration-200 hover:scale-105"
        >
          <FaTimesCircle
            className="w-5 h-5"
            style={{ color: themeColor.borderColor }}
          />
        </button>
      )}

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
        <div className="w-full h-36 scrollbar-hide overflow-y-auto">
          {containers.map((container, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 mb-2 border rounded-md bg-gray-50 hover:bg-gray-200 transition-colors duration-200"
            >
              <span>{container.name}</span>
              <div className="flex items-center space-x-4">
                <span>{container.ip}</span>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      container.active === 'running'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <span className="text-sm">
                    {container.active === 'running' ? 'Running' : 'Stopped'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-36 text-center text-gray-500 p-4">
          No containers available
        </div>
      )}
    </div>
  );
};

export default CardContainer;
