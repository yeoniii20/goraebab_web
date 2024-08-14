'use client';

import React from 'react';
import { useSnackbar } from 'notistack';
import { showSnackbar } from '@/utils/toastUtils';

const SaveButton = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    // main 태그 안의 내용만 저장함 (layout 제외)
    const mainContent = document.querySelector('main')?.innerHTML;

    if (!mainContent) {
      showSnackbar(
        enqueueSnackbar,
        '빈 설계도는 저장할 수 없습니다.',
        'error',
        '#FF4848'
      );
      return;
    }

    // 파일 이름 생성 (설계도_날짜 형식)
    const currentDateTime = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `설계도_${currentDateTime}.html`;

    // main 태그의 내용을 Blob으로 저장
    const blob = new Blob([mainContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // 저장 완료 메시지 표시
    showSnackbar(
      enqueueSnackbar,
      '설계도가 성공적으로 저장되었습니다!',
      'success',
      '#4C48FF'
    );
  };

  return (
    <>
      <div className="fixed bottom-4 right-[35px] transform translate-x-4 h-[50px] p-3 bg-blue_1 rounded-lg shadow-lg flex items-center justify-between">
        <button
          className="px-4 py-2 text-white text-center"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default SaveButton;
