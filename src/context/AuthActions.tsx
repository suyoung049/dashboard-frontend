import { ILoginSuccess, IUserItemResponse } from "../dummyData";

export type LoginActionType =
  | "LOGIN_START"
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILURE"
  | "FOLLOW"
  | "SET_USER";

export interface ILoginState {
  type: LoginActionType;
  payload?: ILoginSuccess | string | IUserItemResponse;
}

export const LoginStart = (): ILoginState => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (payload: ILoginSuccess): ILoginState => ({
  type: "LOGIN_SUCCESS",
  payload,
});

export const LoginFailure = (error: string): ILoginState => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (userId: string): ILoginState => ({
  type: "FOLLOW",
  payload: userId,
});

export const SetUser = (payload: IUserItemResponse): ILoginState => ({
  type: "SET_USER",
  payload
});
