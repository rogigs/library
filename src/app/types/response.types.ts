export type Response<T> = {
  status: number;
  data: T;
};

export type ResponsePagination<T> = {
  status: number;
  data: {
    items: T;
    total: number;
    currentPage: number;
    totalPages: number;
  };
};
