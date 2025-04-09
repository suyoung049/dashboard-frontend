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
      sessionStorage.setItem("user", JSON.stringify(action.payload));
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
    case "FOLLOW":
      if (!state.user) return state;

      const updatedFollowings = [...state.user.followings as string[], action.payload];

      const updatedUserFollow : IUserItemResponse  = {
        ...state.user,
        followings: updatedFollowings as string[],
      };

      sessionStorage.setItem("user", JSON.stringify(updatedUserFollow));

      return {
        ...state,
        user: updatedUserFollow,
      };
    case "UNFOLLOW":
      if (!state.user) return state;

      const filteredFollowings = state.user.followings?.filter(
        (following) => following !== action.payload
      );

      const updatedUserUnfollow = {
        ...state.user,
        followings: filteredFollowings,
      };

      sessionStorage.setItem("user", JSON.stringify(updatedUserUnfollow));

      return {
        ...state,
        user: updatedUserUnfollow,
      };
    default:
      return state;
  }
};
