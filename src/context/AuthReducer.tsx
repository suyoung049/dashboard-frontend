import { decodeJwt } from "jose";
import { ILoginSuccess, IUserItemResponse } from "../dummyData";
import { ILoginState } from "./AuthActions";
interface IAuthState {
  user?: IUserItemResponse | null;
  isFetching: boolean;
  error: boolean | string;
}

export const AuthReducer = (
  state: IAuthState,
  action: ILoginState
): IAuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS": {
      if (typeof action.payload === "string") {
        return {
          isFetching: false,
          error: "Invalid payload in LOGIN_SUCCESS",
        };
      }

      const getUserFromToken = (
        token: string | null
      ): IUserItemResponse | null => {
        if (!token) return null;

        try {
          const decoded = decodeJwt<IUserItemResponse>(token); // ✅ 제네릭으로 타입 지정
          const { exp, iat, ...user } = decoded;
          return user;
        } catch (error) {
          return null;
        }
      };
      const { accessToken, refreshToken } = action.payload as ILoginSuccess;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      const user = getUserFromToken(accessToken) as IUserItemResponse;
      return {
        user,
        isFetching: false,
        error: false,
      };
    }
    case "LOGIN_FAILURE":
      return {
        isFetching: false,
        error: action.payload as string,
      };
    case "SET_USER":
      return {
        
        user: action.payload as IUserItemResponse,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};
