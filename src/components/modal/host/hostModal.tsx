import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { showSnackbar } from '@/utils/toastUtils';
import { colorsOption } from '@/data/color';

interface HostModalProps {
  onClose: () => void;
  onSave: (
    id: string,
    hostNm: string,
    ip: string,
    isRemote: boolean,
    themeColor: {
      label: string;
      bgColor: string;
      borderColor: string;
      textColor: string;
    }
  ) => void;
}

const HostModal = ({ onClose, onSave }: HostModalProps) => {
  const id = uuidv4();

  const [isRemote, setIsRemote] = useState<boolean>(false);
  const [hostNm, setHostNm] = useState<string>('');
  const [ip, setIp] = useState<string>('');

  // Initialize with the first color option as default
  const defaultColor = colorsOption.find((color) => !color.sub);
  const defaultSubColor = colorsOption.find(
    (color) => color.label === defaultColor?.label && color.sub
  );

  const [selectedColor, setSelectedColor] = useState<any>({
    label: defaultColor?.label || '',
    color: defaultColor?.color || '',
    subColor: {
      bgColor: defaultSubColor?.color || '',
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    if (!hostNm) {
      showSnackbar(
        enqueueSnackbar,
        'Host 이름을 입력해주세요.',
        'error',
        '#FF4853'
      );
      return;
    }

    if (!ip) {
      showSnackbar(enqueueSnackbar, 'IP를 입력해주세요.', 'error', '#FF4853');
      return;
    }

    // 유효성 검사가 완료된 후 onSave 호출
    if (selectedColor) {
      onSave(id, hostNm, ip, isRemote, {
        label: selectedColor.label,
        bgColor: selectedColor.subColor.bgColor,
        borderColor: selectedColor.color,
        textColor: selectedColor.color,
      });
    }
    onClose();
  };

  const handleColorSelection = (colorLabel: string) => {
    const mainColor = colorsOption.find(
      (color) => color.label === colorLabel && !color.sub
    );
    const subColor = colorsOption.find(
      (color) => color.label === colorLabel && color.sub
    );
    setSelectedColor({
      label: colorLabel,
      color: mainColor?.color || '',
      subColor: {
        bgColor: subColor?.color || '',
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-20" />
      <div className="relative bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Host</h2>
        <input
          type="text"
          placeholder="Host Name"
          value={hostNm}
          onChange={(e) => setHostNm(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="IP Address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="hostType"
              value="local"
              checked={!isRemote}
              onChange={() => setIsRemote(false)}
              className="mr-2"
            />
            Local
          </label>
          <label>
            <input
              type="radio"
              name="hostType"
              value="remote"
              checked={isRemote}
              onChange={() => setIsRemote(true)}
              className="mr-2"
            />
            Remote
          </label>
        </div>
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Select Color Theme:</h3>
          <div className="flex space-x-2">
            {colorsOption
              .filter((color) => !color.sub)
              .map((color) => (
                <div
                  key={color.id}
                  onClick={() => handleColorSelection(color.label)}
                  className={`w-6 h-6 rounded-full cursor-pointer ${
                    selectedColor?.label === color.label
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : ''
                  }`}
                  style={{ backgroundColor: color.color }}
                />
              ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Host
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostModal;
