export type SuccessResponse<TData> = {
  success: true;
  data: TData;
  error: null;
};

export type ErrorResponse<TError> = {
  success: false;
  data: null;
  error: TError;
};

export type Response<TData, TError = unknown> = SuccessResponse<TData> | ErrorResponse<TError>;
