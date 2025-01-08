
type ApiResponse<T extends Record<string, any>> = T;

type PaginatedData<T> = {
  count: number,
  next: string,
  previous: string,
  results: T
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

type paramsProps<T extends Record<string, any>> = T;

type GenericApiResponse<T> = {
  data: Promise<T>,
  status: number,
  ok: boolean
}
