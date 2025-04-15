import { createContext, useReducer, FC, useEffect } from "react";
import { AuthReducer } from "./AuthReducer";
import { ILoginState } from "./AuthActions";
import { IUserItemResponse } from "../dummyData";
import { decodeJwt } from "jose";
import axios from "axios";

interface IAuthContext {
  user: IUserItemResponse | null;
  isFetching: boolean;
  error: boolean | string;
  dispatch: React.Dispatch<ILoginState>;
}

export const getUserFromToken = async (
  token: string | null
): Promise<IUserItemResponse | null> => {
  if (!token) return null;

  try {
    const decoded = decodeJwt<IUserItemResponse>(token); // ✅ 제네릭으로 타입 지정
    const { exp, iat, ...user } = decoded;
    return user;
  } catch (error) {
    console.warn("Token invalid or expired, refreshing...", error);

    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) return null;

    return getUserFromToken(newAccessToken); // ✅ 재귀 호출할 때도 return
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken") as string;
    const res = await axios.post("/auth/refresh", { token: refreshToken });
    const data = res.data;
    if (data.accessToken) {
      sessionStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    }
  } catch (e) {
    sessionStorage.clear();
    window.location.href = "http://localhost:3000/login";
  }
};

const INITIAL_STATE: IAuthContext = {
  user: null,
  isFetching: false,
  error: false,
  dispatch: () => {},
};

export const AuthContext = createContext<IAuthContext>(INITIAL_STATE);

export const AuthContextProvider: FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const initUser = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const user = (await getUserFromToken(accessToken)) as IUserItemResponse;
      dispatch({ type: "SET_USER", payload: user });
    };
    initUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user as IUserItemResponse,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
