
type ApiResponse<T extends Record<string, any>> = T;

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

type paramsProps<T extends Record<string, any>> = T;