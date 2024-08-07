import axios from 'axios';

async function createAndStartContainer(image: string, containerName: string) {
  try {
    // 컨테이너 생성
    const createResponse = await axios.post(
      'http://localhost:2375/containers/create',
      {
        Image: image,
        name: containerName,
      }
    );
    const containerId = createResponse.data.Id;

    // 컨테이너 시작
    await axios.post(`http://localhost:2375/containers/${containerId}/start`);
    console.log(`Container ${containerName} started successfully`);
  } catch (error) {
    console.error('Error creating or starting container:', error);
  }
}

createAndStartContainer('nginx', 'my-nginx-container');
