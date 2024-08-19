@@ -0,0 +1,72 @@
'use client';

import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { showSnackbar } from '@/utils/toastUtils';
import ImageModal from '../modal/image/imageModal';

interface AddImageButtonProps {
  onCreate: (imageData: any) => void; // 이미지 데이터를 부모 컴포넌트로 전달하는 콜백
}

const AddImageButton = ({ onCreate }: AddImageButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (
    id: string,
    name: string,
    tags: string,
    file: File | null,
    size: string,
    source: 'local' | 'dockerHub', // 이미지의 출처를 구분
    dockerImageInfo?: any // Docker Hub에서 선택된 이미지의 추가 정보
  ) => {
    const imageData = {
      id,
      name,
      tags,
      file,
      size,
      source,
      dockerImageInfo, // Docker Hub 이미지 정보 (선택적)
    };

    // 부모 컴포넌트로 이미지 데이터 전달
    onCreate(imageData);

    // 성공 메시지 표시
    showSnackbar(
      enqueueSnackbar,
      '이미지가 성공적으로 추가되었습니다!',
      'success',
      '#4C48FF'
    );

    // 모달 닫기
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="mt-4 p-2 w-full text-white rounded font-bold bg-blue_2"
      >
        Add Image
      </button>
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default AddImageButton;
