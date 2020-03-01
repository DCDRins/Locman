import axios from 'axios';
import { ServerResponse } from 'http';

const URL = 'http://10.0.4.134/api/';

const getToken = () => localStorage.getItem('token');

const formatToken = (token: string | null) => {
  return `Bearer ${token}`;
};

// Public
export const setToken = (token: string) => {
  agentInstance.defaults.headers.common.Authorization = formatToken(token);
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
      // Authorization: formatToken(
      //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU3ZjM0NWRiOTY3ZDFjMWFkYmM1YTA5ZTkxZjhiN2E5NjIwNTI4OTA0YTYwNjI3YWUzNWYzODQ5NTJlZmUzMzUwYzZmNzBmMWU5NjQzZDI5In0.eyJhdWQiOiIyIiwianRpIjoiZTdmMzQ1ZGI5NjdkMWMxYWRiYzVhMDllOTFmOGI3YTk2MjA1Mjg5MDRhNjA2MjdhZTM1ZjM4NDk1MmVmZTMzNTBjNmY3MGYxZTk2NDNkMjkiLCJpYXQiOjE1ODIxNjgyMDcsIm5iZiI6MTU4MjE2ODIwNywiZXhwIjoxNTgyMTk3MDA3LCJzdWIiOiIxMjIiLCJzY29wZXMiOltdfQ.XY07pMGDFGUH-yR7yG2rsWaUU9Vs8feTaXtzDYvEi62VS7hB5gq6QXt7DhaKhDrsCDYSZC958BgWhbwBmxNBHomes9gvFDG2L76w270ZkQM6SlZjEr2_3fdm7ELEOgVrzsbTHApRU_sPDpQpkZVLUces59FE3o74RTGFhKbFO_45IOEOnDahkgS9k0s93HDrbH1Cr1p-0jfg_fyjSYVeHhJlADKFpzgkdDBDnQgfYIQN3qRtz0XyWl-VN5b_5vL7Wq8sKcQjlHlJjuBlxxE0wyYg52FqGiQOqkIlZHDC0NQ-jrQOvHM6JPVw0duZJ8bt7kb9geTSieVdipUHMza0EzE1kIYKQ_kzsRQ6ITQomAFLaOP9lAbeq5G-GySskkoSymUu0a9Y-cN1vBvee4cIHtwgfIP0VdITCe49n6oyfmXL4CjlJGvQh_K_LKSwKv1TW85VvzVeVuJ1mvw7CSAbNcov8e0JvLHurNELGp8qPVj0gAdLcjL-Be9fBC7kLH2nYZupiivYL9MAc9rBwiDE3uoyk1SCIqScC0iqO78jsKLjbypjo1l8HZWF3PvU7yOPLINdiDoAo_CCCo-e69_Co_YZ06R5K_kTC8vvsjOUMbUu8vcXzQdVRBpIP-t6Ofd3EjR-rxJjTxReTgA4wIkdKiEV_PBgQx2f50ZlHclKGbs"
      // ),
    },
  },
});
export default agentInstance;
