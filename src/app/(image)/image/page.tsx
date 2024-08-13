'use client';

import { Card, ImageModal } from '@/components';
import { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { selectedHostStore } from '@/store/seletedHostStore';

const ImagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cards, setCards] = useState<
    {
      id: string;
      name: string;
      tags: string;
      file: File;
      size: string;
      status: string;
    }[]
  >([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 상태 배열
  const statuses = ['primary', 'secondary', 'accent', 'success'];

  // 랜덤 상태 선택 함수
  const getRandomStatus = () => {
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  const handleSave = (
    id: string,
    name: string,
    tags: string,
    file: File,
    size: string
  ) => {
    // 테스트용 랜덤 상태 생성
    const randomStatus = getRandomStatus();
    setCards([...cards, { id, name, tags, file, size, status: randomStatus }]);
  };
  const { selectedHostId } = selectedHostStore();

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="min-h-screen flex items-center justify-center flex-col">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Open Modal
        </button>
        <p className="mt-2">Example::: 모달에서 입력한 정보를 카드에 보여줌</p>
        <div className="mt-4 max-w-4xl">
          {cards.map((item, index) => (
            <Card key={index} data={item} selectedHostId={selectedHostId} />
          ))}
        </div>
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
        />
      </div>
    </SnackbarProvider>
  );
};

export default ImagePage;
