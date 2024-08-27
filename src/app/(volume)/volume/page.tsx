'use client';

import { getConnectDaemon } from '@/services/api';
import { useEffect } from 'react';

// import ContainersManagement from '@/components/docker/containersManagement';
// import DBManagement from '@/components/docker/dbManagement';
// import DockerManagement from '@/components/docker/dockerManagement';
// import HarborManagement from '@/components/docker/harborManagement';

const VolumePage = () => {
  // const fetchDaemon = async () => {
  //   const data = await getConnectDaemon();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchDaemon();
  // }, []);

  const handleApiTest = async () => {
    try {
      const response = await fetch('/api/daemon');

      if (response.ok) {
        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response:', data);
      } else {
        console.log('API 요청 실패');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
    }
  };

  return (
    <>
      <h1>Management Dashboard</h1>
      <button onClick={handleApiTest}>Api test</button>
      {/* <DockerManagement />
      <DBManagement />
      <HarborManagement />
      <ContainersManagement /> */}
    </>
  );
};

export default VolumePage;
