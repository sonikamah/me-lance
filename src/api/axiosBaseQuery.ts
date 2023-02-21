import axios, {AxiosInstance} from 'axios';
import Cookies from "js-cookie";
import {Properties} from "../Properties";
const baseUrl = Properties.API_URL;

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
    'Content-Type': 'application/json'
  },
  // headers.set('Authorization', `Bearer ${token}`);
  withCredentials: false,
});

const defaultOptions: FetchOptions = {method: 'get'};

export const axiosBaseQuery = (url: string, {method, data, params} = defaultOptions) =>
  applicationFetch({
    method: method,
    data: data,
    url: `${baseUrl}${url}`,
    params: params,
  }).catch((err: Error) => {
    throw err;
  });