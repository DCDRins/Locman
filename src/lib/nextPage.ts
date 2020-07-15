import { Pagination, Nullable } from "../.types/types";

export default function nextPage<T>(data: Nullable<Pagination<T>>) {
  if (!data) return 1;
  const {
    // totalItems,
    currentPage,
    totalPages,
  } = data;
  return currentPage && totalPages
    ? currentPage === totalPages
      ? null
      : currentPage + 1
    : null;
}