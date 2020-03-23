import axios from 'axios';

const URL = 'http://10.0.4.134/api/';

const getToken = () => {
  const client = localStorage.getItem('client')
  return client && JSON.parse(client).accessToken;
};

const formatToken = (token?: string) => {
  return `Bearer ${token}`;
};

// not usable yet --->
export const setToken = () => {
  agentInstance.defaults.headers.common.Authorization = formatToken(getToken());
};

const agentInstance = axios.create({
  baseURL: URL,
  responseType: 'json',
  headers: {
    post: {
      'Content-Type': 'json',
    },
    common: {
      Accept: 'application/json',
      Authorization: formatToken(getToken()),
    },
  },
});
export default agentInstance;
