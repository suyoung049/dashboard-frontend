import { createContext, useReducer, FC } from "react";
import { AuthReducer } from "./AuthReducer";
import { ILoginState } from "./AuthActions";
import { IUserItemResponse } from "../dummyData";

interface IAuthContext {
  user: IUserItemResponse | null;
  isFetching: boolean;
  error: boolean | string;
  dispatch: React.Dispatch<ILoginState>;
}

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
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
