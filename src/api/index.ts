import { Credentials, User } from "src/store/actions/user";
import axios, {AxiosInstance} from 'axios';
import http from "../services/httpService";
import {Properties} from "../Properties";
import Cookies from 'js-cookie';

const baseUrl = Properties.API_URL;

// const API_URL = process.env.REACT_APP_API_URL;

export type Methods =
  | 'get'
  | 'put'
  | 'post'
  | 'head'
  | 'delete'
  | 'patch'
  | 'options';

interface FetchOptions {
  method?: Methods;
  data?: any;
  params?: Record<string, any>;
}
interface CookiesOptions {
  name: string;
  value?: string;
  expires?: number;
}

export const getCookie = (name: string) => Cookies.get(name);

export const setCookie = ({name, value = '', expires}: CookiesOptions) =>
  Cookies.set(name, value, {expires});

export const deleteCookie = ({name}: CookiesOptions) => Cookies.remove(name);

const applicationFetch: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 360 * 1000,
  // paramsSerializer: (params: any) =>
    // Qs.stringify(params, {arrayFormat: 'repeat'}),
  headers: {
    'x-csrftoken': getCookie('csrftoken'),
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

const defaultOptions: FetchOptions = {method: 'get'};

const api = (url: string, {method, data, params} = defaultOptions) =>
  applicationFetch({
    method: method,
    data: data,
    url: url,
    params: params,
  }).catch((err: Error) => {
    throw err;
  });

const postLogin = (credentials: Credentials) => api(`${baseUrl}auth/login`, {
  method: "post",
  data: credentials
})
  // http.post<{ user: User }>(`${baseUrl}auth/login`, credentials);

const sendResetPasswordLink = (email: string) => http.post("/auth/login/forgot", { email });

const resetPassword = (password: string, token: string) =>
  http.post<void>(`/auth/login/reset/${token}`, { password });

const postLogout = () => http.post<void>("/auth/logout");

const postUser = (user: User) => api(`${baseUrl}auth/register`, {
  method: "post",
  data: user
})
//http.post<void>("/user/register", user);

const getConfirmation = (token: string) => http.get<void>(`/auth/confirmation/${token}`);

const resendConfirmation = (email: string) => http.post<void>("/auth/send-confirmation", { email });

const resetRegister = (email: string) => http.post<void>("/user/register/cancel", { email });

const getUser = () => http.get<{ user: User }>("/user");

export {
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
