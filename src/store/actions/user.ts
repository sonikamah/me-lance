export const LOGIN_USER_REQUESTED = "LOGIN_USER_REQUESTED";
export const LOGIN_USER_SUCCESSFUL = "LOGIN_USER_SUCCESSFUL";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female" | "other" | "";
  // phone: number;
  dob: string;
  isPolicyAccepted: boolean;
  // password: string;
};

export type Credentials = {
  identifier: string;
  password: string;
};

export type UserAction<T> = {
  type: string;
  payload?: T;
};

export function loginRequest(): any{
  return {
    type: LOGIN_USER_REQUESTED
  };
}

export function loginSuccess(data: any): any {
  return {
    type: LOGIN_USER_SUCCESSFUL,
    payload: data,
  };
}

export function loginFailure(errors: any): any {
  return {
    type: LOGIN_USER_FAILURE,
    errors
  };
}

export function logout(): UserAction<never> {
  return {
    type: LOGOUT_USER,
  };
}

export function setUser(user: User): UserAction<User> {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function resetUser(): UserAction<never> {
  return { type: RESET_USER };
}
