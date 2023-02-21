import {
  LOGIN_USER_SUCCESSFUL,
  LOGIN_USER_REQUESTED,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  SET_USER,
  RESET_USER,
  UserAction,
  User,
} from "../actions/user";

export type UserState = {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
};

const initialState: UserState = {
  isAuth: false,
  user: null,
  loading: false,
};

export default function user(state = initialState, action: any): any {
  switch (action.type) {
    case LOGIN_USER_REQUESTED:
      return {
        ...state,
        isAuth: false,
        loading: true,
      };

    case LOGIN_USER_SUCCESSFUL:
      return {
        ...state,
        ...action.payload.data,
        isAuth: true,
        loading: false,
      };

    case LOGIN_USER_FAILURE:
      return {
        errors: action.payload.errors,
        isAuth: false,
      };
    case LOGOUT_USER:
      return {
        isAuth: false,
        user: null,
      };
    case SET_USER:
      return {
        user: action.payload,
        isAuth: true,
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
}
