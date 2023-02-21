import { login, logout, User } from "../actions/user";
import { Dispatch } from "redux";
import { Credentials } from "src/store/actions/user";

import {
  postVerifyOtp,
  postUser,
  postLogin,
  postLogout,
  getConfirmation,
  resendConfirmation,
  resetRegister,
  sendResetPasswordLink,
  resetPassword,
} from "../../api/index";
import { NavigateFunction } from "react-router";
import { setAccessToken, setRefreshToken } from "../actions/auth";
import {
  setUser,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../actions/user";

const setLocalStorageItem = (tokens: any) => {
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

const storeUserData = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const attemptLogin =
  (credentials: Credentials, navigate: NavigateFunction) =>
  (dispatch: Dispatch) => {
    try {
      dispatch(loginRequest());
      postLogin(credentials).then(({ data }: any): any => {
        if (data && data.user && data.tokens) {
          const tokens = data.tokens;

          // dispatch(setAccessToken(tokens.access?.token));
          // dispatch(setRefreshToken(tokens.refresh?.token));
          // dispatch(setUser(data.user));
          // dispatch(setLoginType(AuthTypeEnum.LOCAL));

          /** Store in local async storage */
          setLocalStorageItem(tokens);
          storeUserData(data.user);
          dispatch(loginSuccess(data));
          navigate("/mainScreen");
        }
      });
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

export const verifyOtp =
  (data: any, navigate: NavigateFunction) =>
  (dispatch: Dispatch) => {
    try {
      dispatch(loginRequest());
      postVerifyOtp(data).then(({ data }: any): any => {
        console.log("-------verify OTP", data)
        navigate('/mainScreen');
      });
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

export const attemptSendResetPasswordLink = (
  email: string,
  navigate: NavigateFunction
) =>
  sendResetPasswordLink(email).then(() => {
    navigate("/login/forgot", { replace: true });
  });

export const attemptResetPassword = (
  password: string,
  token: string,
  navigate: NavigateFunction
) =>
  resetPassword(password, token)
    .then(() => {
      navigate("/login", { replace: true });
    })
    .catch(() => {
      navigate(`/login/reset/${token}`, { replace: true });
    });

export const attemptLogout =
  (navigate: NavigateFunction) => (dispatch: Dispatch) =>
    postLogout()
      .then(() => {
        dispatch(logout());
      })
      .finally(() => {
        navigate("/login", { replace: true });
      });

export const attemptRegister = (newUser: User) => () => postUser(newUser);

export const attemptGetConfirmation =
  (token: string, navigate: NavigateFunction) => (dispatch: Dispatch) =>
    getConfirmation(token).then(() => {
      navigate("/login", { replace: true });
    });

export const attemptResendConfirmation =
  (email: string, navigate: NavigateFunction) => (dispatch: Dispatch) =>
    resendConfirmation(email).catch(() => {
      navigate("/register", { replace: true });
    });

export const attemptResetRegister =
  (email: string, navigate: NavigateFunction) => (dispatch: Dispatch) =>
    resetRegister(email)
      .then(({ data }: any) => {
        const tokens = data.tokens;
        dispatch(setAccessToken(tokens.access?.token));
        dispatch(setRefreshToken(tokens.refresh?.token));
        dispatch(setUser(data.user));
        // dispatch(setLoginType(AuthTypeEnum.LOCAL));

        /** Store in local async storage */
        setLocalStorageItem(tokens);
        storeUserData(data.user);
      })
      .catch(() => {
        navigate("/register", { replace: true });
      });
