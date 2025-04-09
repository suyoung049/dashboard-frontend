import { IUserItemResponse } from "../dummyData";

export type LoginActionType =
  | "LOGIN_START"
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILURE"
  | "FOLLOW"
  | "UNFOLLOW";

export interface ILoginState {
  type: LoginActionType;
  payload?: IUserItemResponse | string;
}

export const LoginStart = (): ILoginState => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: IUserItemResponse): ILoginState => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error: string): ILoginState => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (userId: string): ILoginState => ({
  type: "FOLLOW",
  payload: userId,
});

export const unFollow = (userId: string): ILoginState => ({
  type: "UNFOLLOW",
  payload: userId,
});
