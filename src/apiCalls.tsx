import { ILoginState } from "./context/AuthActions";
import axios from "axios";
import { ILoginSuccess } from "./dummyData";

export const loginCall = async (
  userCredential: { email: any; password: any },
  dispatch: React.Dispatch<ILoginState>
) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data as ILoginSuccess });
  } catch (e) {
    dispatch({ type: "LOGIN_FAILURE", payload: e as string });
  }
};
