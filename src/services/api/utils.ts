import { ServerResponse } from "./types";

export const removeKeys = <T>(payload: T, keys: Array<keyof T>) => {
  keys.forEach((key) => {
    delete payload[key];
  });

  return payload;
};

export const responseLogger = (response) => {
  const { data, config: { url, method, data: configData }, status, statusText } = response;
  const colorType = status === 200 ? 'lightgreen'
  : 'white';
  setTimeout(() => {

    console.groupCollapsed(`%c${method}: ${url}`, `background: ${colorType}`);
    console.info('config:', configData || {});
    console.info({ status, statusText });
    console.info(data);
    console.groupEnd();
  }, 1000)
}
export const transformResponse = <T>(r: ServerResponse<T>) => r && r.data
