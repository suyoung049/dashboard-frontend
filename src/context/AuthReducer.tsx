import { ILoginState } from "./AuthActions";
import { IUserItemResponse } from "../dummyData";

interface IAuthState {
  user: IUserItemResponse | null;
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
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload as IUserItemResponse,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload as string,
      };
    default:
      return state;
  }
};
