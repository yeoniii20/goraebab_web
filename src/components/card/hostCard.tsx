import { useHostStore } from '@/store/hostStore';
import { selectedHostStore } from '@/store/seletedHostStore';
import { FaHome } from 'react-icons/fa';

export type HostCardProps = {
  id: string;
  hostNm?: string;
  ip: string;
  /**
   * connect: true
   * disconnect: false
   */
  status?: boolean;
  onClick?: () => void;
  className?: string;
};

const HostCard = ({
  id,
  hostNm,
  ip,
  status = true,
  className = '',
}: HostCardProps) => {
  const { selectedHostId, setSelectedHostId } = selectedHostStore();

  const handleClick = () => {
    setSelectedHostId(selectedHostId === id ? null : id);
  };

  const borderColor = status ? 'border-blue_2' : 'border-red_2';
  const bgColor = status ? 'bg-blue_1' : 'bg-red_1';
  const textColor = status ? 'text-blue_2' : 'text-red_2';

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center p-[10px] border bg-white border-grey_3 rounded-lg shadow-lg w-72 h-28 z-0 transform transition-transform duration-200 cursor-pointer ${className} ${
        selectedHostId === id ? 'scale-105 border-blue-500' : ''
      }`}
    >
      <div
        className={`flex items-center justify-center w-full space-x-2 rounded-md border-solid border-2 ${borderColor} ${bgColor} py-2 mb-3`}
      >
        <FaHome className={`w-4 h-4 ${textColor}`} />
        <div className={`text-sm font-semibold ${textColor}`}>
          {hostNm || 'HOST'}
        </div>
      </div>
      <div className="text-lg font-semibold">{`eth0 : ${ip}`}</div>
    </div>
  );
};

export default HostCard;
