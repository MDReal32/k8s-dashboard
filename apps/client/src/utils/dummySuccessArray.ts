import { SuccessResponse } from "../types";

export const dummySuccessArray = (): SuccessResponse<any[]> => ({
  success: true,
  data: [],
  error: null
});
