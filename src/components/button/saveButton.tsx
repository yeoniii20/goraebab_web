'use client';

import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { showSnackbar } from '@/utils/toastUtils';

const SaveButton = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
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
