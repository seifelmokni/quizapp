export interface BaseResponse {
  success: boolean;
  message: string;
  token: string;
  errors?: any;
}

// deprecating
export interface WebSocketResponse extends BaseResponse {
  type: string;
}
