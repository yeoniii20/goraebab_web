import { useHostStore } from '@/store/hostStore';
import { selectedHostStore } from '@/store/seletedHostStore';
import { FaTrash, FaHome } from 'react-icons/fa';

export type HostCardProps = {
  id: string;
  hostNm?: string;
  ip: string;
  status?: boolean;
  isRemote: boolean;
  themeColor: {
    label: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
  };
  networkIp: string;
  onClick?: () => void;
  className?: string;
  isSelectedNetwork?: boolean; // 네트워크가 선택된 상태인지 여부
};

const HostCard = ({
  id,
  hostNm,
  ip,
  isRemote,
  themeColor,
  className = '',
  isSelectedNetwork = false, // 기본값은 false
}: HostCardProps) => {
  const { selectedHostId, setSelectedHostId } = selectedHostStore();
  const deleteHost = useHostStore((state) => state.deleteHost);

  const handleDeleteHost = () => {
    deleteHost(id);
  };

  const handleClick = () => {
    setSelectedHostId(selectedHostId === id ? null : id);
  };

  // 선택된 호스트 또는 네트워크에 따라 테두리 색상을 설정
  const borderColor =
    selectedHostId === id || isSelectedNetwork
      ? themeColor.borderColor
      : 'grey';
  const badgeText = isRemote ? 'REMOTE' : 'LOCAL';

  return (
    <div
      className={`${className} relative transition-transform duration-200 ${
        selectedHostId === id || isSelectedNetwork ? 'transform scale-105' : ''
      }`}
    >
      <div
        className={`absolute text-xs font-semibold border-2 h-6 px-1 rounded-t-lg content-center`}
        style={{
          top: '-1.4rem',
          left: '1.25rem',
          zIndex: '10',
          borderColor: `${themeColor.borderColor}`,
          color: `${themeColor.textColor}`,
          backgroundColor: `${themeColor.bgColor}`,
        }}
      >
        {badgeText}
      </div>
      <div
        onClick={handleClick}
        className={`relative flex flex-col items-center p-[10px] border bg-white rounded-lg shadow-lg w-72 h-28 cursor-pointer`}
        style={{
          borderColor: borderColor,
          borderWidth:
            selectedHostId === id || isSelectedNetwork ? '2px' : '1px',
        }}
      >
        {selectedHostId === id && (
          <button
            onClick={handleDeleteHost}
            className="absolute top-4 right-4 p-1.5 rounded-full  text-grey_5 hover:bg-grey_0 bg-white hover:text-white transition-colors duration-200"
          >
            <FaTrash className="w-4 h-4" style={{ color: borderColor }} />
          </button>
        )}
        <div
          className={`flex items-center justify-center w-full space-x-2 rounded-md border-solid border-2 py-2 mb-3`}
          style={{
            borderColor: `${themeColor.borderColor}`,
            backgroundColor: `${themeColor.bgColor}`,
          }}
        >
          <FaHome
            className={`w-4 h-4`}
            style={{ color: `${themeColor.textColor}` }}
          />
          <div
            className={`text-sm font-semibold`}
            style={{ color: `${themeColor.textColor}` }}
          >
            {hostNm || 'HOST'}
          </div>
        </div>
        <div className="text-lg font-semibold">{`eth0 : ${ip}`}</div>
      </div>
    </div>
  );
};

export default HostCard;
