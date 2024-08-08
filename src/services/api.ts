import axios from 'axios';

export const getDockerList = async () => {
  const response = await axios.get('/api/docker/list');
  return response.data;
};

export const connectDocker = async () => {
  const response = await axios.post('/api/docker/connect');
  return response.data;
};

export const deleteDocker = async (dockerId: string) => {
  await axios.delete(`/api/docker/delete?dockerId=${dockerId}`);
};

export const getdatabaseList = async () => {
  const response = await axios.get('/api/database/list');
  return response.data;
};

export const registerdatabase = async (databaseDetails: any) => {
  const response = await axios.post('/api/database/register', databaseDetails);
  return response.data;
};

export const copydatabaseDesignToLocal = async () => {
  const response = await axios.post('/api/database/copy');
  return response.data;
};

export const deletedatabase = async (databaseId: string) => {
  await axios.delete(`/api/database/delete?databaseId=${databaseId}`);
};

export const registerHarbor = async (harborDetails: any) => {
  const response = await axios.post('/api/harbor/register', harborDetails);
  return response.data;
};

export const getHarborList = async () => {
  const response = await axios.get('/api/harbor/list');
  return response.data;
};

export const getDockerHubImages = async (query: string) => {
  const response = await axios.get(`/api/dockerHubSearch?query=${query}`);
  return response.data;
};
