export default function transformRequest(data, transformedData) {
  return data && {
    ...data,
    ...transformedData,
  };
}