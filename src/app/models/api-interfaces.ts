export interface Message {
  message: string;
}

export enum StatusResponse {
  SUCCESSES = 0,
  FAILURE = -1
}

export interface IResponse {
  status: StatusResponse;
  res: any;
}
