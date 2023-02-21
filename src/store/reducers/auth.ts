export type AuthState = {
  accessToken: string;
  refreshToken: string;
};

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
};

export default function auth(state = initialState, action: any): AuthState {
  switch (action.type) {
    case "SET_REFRESH_TOKEN":
      return {
        ...state,
        refreshToken: action.payload.token,
      };
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload.token,
      };
    default:
      return state;
  }
}
