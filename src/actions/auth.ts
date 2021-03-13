//Imported Types, packages and helpers
import {
  ERROR_LOGIN,
  SET_AUTHENTICATED,
  LOGGING_OUT,
  ERROR_SIGNUP,
  USER_DETAIL,
  LOGGED_OUT,
  USER_LOADING,
} from "./types";
import axios from "axios";
import { isEmail, signInError } from "../Helpers/firebase";
import store from "../store";
import { RouteComponentProps } from "react-router";
import { PRODUCTION_AUTH_ENDPOINT } from "../Helpers/";

interface loginData {
  email: string;
  password: string;
}

//SignIn User
export const LogIn = (
  data: loginData,
  history: RouteComponentProps["history"],
  rememberMe: boolean
) => async (dispatch: typeof store.dispatch) => {
  dispatch({ type: USER_LOADING });

  if (rememberMe) {
    localStorage.setItem("user-email", data.email);
    localStorage.setItem("user-password", data.password);
  } else {
    localStorage.removeItem("user-email");
    localStorage.removeItem("user-password");
  }

  const isValidEmail = isEmail(data.email);
  if (!isValidEmail) {
    dispatch({
      type: ERROR_LOGIN,
      payload: "Must be a valid email address",
    });
  } else {
    try {
      const response = await axios.post(
        `${PRODUCTION_AUTH_ENDPOINT}/login`,
        data
      );
      console.log(response.data);
      dispatch({ type: SET_AUTHENTICATED });
      setAuthorization(response.data.token);
      dispatch({ type: USER_DETAIL, payload: response.data });
      history.push("/main");
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: ERROR_LOGIN,
        payload: signInError(err.response.data.message, data.email),
      });
    }
  }
};

//Register User
export const Register = (data: any, history: any) => async (dispatch: any) => {
  //Dispatch loading user on button click and store form
  dispatch({ type: USER_LOADING });

  const isValidEmail = isEmail(data.email);
  if (!isValidEmail) {
    dispatch({
      type: ERROR_SIGNUP,
      payload: "Must be a valid email address",
    });
  } else {
    try {
      const response = await axios.post(
        `${PRODUCTION_AUTH_ENDPOINT}/register`,
        data
      );
      console.log(response.data);
      dispatch({ type: SET_AUTHENTICATED });
      localStorage.setItem("auth-token", JSON.stringify(response.data.token));
      dispatch({ type: USER_DETAIL, payload: response.data });
      history.push("/home");
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: ERROR_SIGNUP,
        payload: signInError(err.response.data.message, data.email),
      });
    }
  }
};

//Logout User
export const logOut = () => async (dispatch: any) => {
  dispatch({ type: LOGGING_OUT });
  try {
    localStorage.removeItem("auth-token");
    dispatch({ type: LOGGED_OUT });
    window.location.href = "/login";
  } catch (err) {}
};

export const setAuthorization = async (token: string) => {
  const BizzToken = token;
  localStorage.setItem("auth-token", BizzToken);
  axios.defaults.headers.authorization = `Bearer ${BizzToken}`;
};
