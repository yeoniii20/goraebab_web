import { useHostStore } from '@/store/hostStore';
import { selectedHostStore } from '@/store/seletedHostStore';

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
import { FaTrash, FaTimesCircle, FaHome } from 'react-icons/fa';

const HostCard = ({
  id,
  hostNm,
  ip,
  isRemote,
  themeColor,
  className = '',
}: HostCardProps) => {
  const { selectedHostId, setSelectedHostId } = selectedHostStore();
  const deleteHost = useHostStore((state) => state.deleteHost);
  const deleteNetwork = useHostStore((state) => state.deleteNetwork);

  const handleDeleteHost = () => {
    deleteHost(id);
  };

  const handleDeleteNetwork = () => {
    deleteNetwork(id, hostNm || 'docker0');
  };

  const handleClick = () => {
    setSelectedHostId(selectedHostId === id ? null : id);
  };

  const borderColor = selectedHostId === id ? themeColor.borderColor : 'grey';
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

      {/* 호스트 삭제 버튼 */}
      <button
        onClick={handleDeleteHost}
        className="absolute top-0 right-0 text-red-600"
      >
        <FaTrash />
      </button>

      {/* 네트워크 삭제 버튼 */}
      <button
        onClick={handleDeleteNetwork}
        className="absolute bottom-0 right-0 text-red-600"
      >
        <FaTimesCircle />
      </button>
    </div>
  );
};

export default HostCard;
