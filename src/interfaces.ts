export interface ISuccessResponse {
  success: true;
  message: string | Array<object> | object;
  status: number;
  data?: any;
}
