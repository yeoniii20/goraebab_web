import { selectedHostStore } from '@/store/seletedHostStore';
import { FaHome } from 'react-icons/fa';

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
};

const HostCard = ({
  id,
  hostNm,
  ip,
  isRemote,
  themeColor,
  className = '',
}: HostCardProps) => {
  const { selectedHostId, setSelectedHostId } = selectedHostStore();

  const handleClick = () => {
    setSelectedHostId(selectedHostId === id ? null : id);
  };

  const borderColor = selectedHostId === id ? themeColor.borderColor : 'grey';

  // 원격/로컬 구분에 따른 뱃지 스타일
  const badgeText = isRemote ? 'REMOTE' : 'LOCAL';

  return (
    <div
      className={`${className} relative transition-transform duration-200 ${
        selectedHostId === id ? 'transform scale-105' : ''
      }`}
    >
      <div
        className={`absolute text-xs font-semibold border-2 h-6 px-1 rounded-t-lg content-center`}
        style={{
          top: '-1.4rem', // 고정 위치 설정
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
          borderWidth: selectedHostId === id ? '2px' : '1px',
        }}
      >
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
