
export function setRefreshToken(token: string) {
  return { type: "SET_REFRESH_TOKEN", payload: { token } };
}

export function setAccessToken(token: string) {
  return { type: "SET_ACCESS_TOKEN", payload: { token } };
}