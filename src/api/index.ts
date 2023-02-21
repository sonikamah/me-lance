import { Credentials, User } from "src/store/actions/user";
import http from "../services/httpService";
import { axiosBaseQuery } from "./axiosBaseQuery";

const postLogin = async (credentials: Credentials) => axiosBaseQuery("auth/login", {
  method: "post",
  data: credentials
})

const postVerifyOtp = async (data: Credentials) => axiosBaseQuery("auth/verify-otp", {
  method: "post",
  data
})

const sendResetPasswordLink = (email: string) => http.post("/auth/login/forgot", { email });

const resetPassword = (password: string, token: string) =>
  http.post<void>(`/auth/login/reset/${token}`, { password });

const postLogout = () => http.post<void>("/auth/logout");

const postUser = (user: User) => axiosBaseQuery("auth/register", {
  method: "post",
  data: user
})

const getConfirmation = (token: string) => http.get<void>(`/auth/confirmation/${token}`);

const resendConfirmation = (email: string) => http.post<void>("/auth/send-confirmation", { email });

const resetRegister = (email: string) => http.post<void>("/user/register/cancel", { email });

const getUser = () => axiosBaseQuery("auth/user")

export {
  postVerifyOtp,
  postLogin,
  sendResetPasswordLink,
  resetPassword,
  postLogout,
  postUser,
  getConfirmation,
  resendConfirmation,
  getUser,
  resetRegister,
};
