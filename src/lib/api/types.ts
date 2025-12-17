export interface BaseResponse<T> {
  success: boolean;
  data: T;
}

export interface BaseErrorResponse {
  data: {
    success: boolean;
    error?: string;
  };
  status: number;
}

export type PaginatedRequestFields = Partial<{
  limit: number;
  page: number;
}>;

export interface ListResponse<ItemsType> {
  totalCount: number;
  limit: number;
  page: number;
  data: ItemsType[];
}
