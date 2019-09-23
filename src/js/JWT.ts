export interface JWTPayload {
  [key: string]: any;
}

export function decodePayload(token: string): JWTPayload {
  return JSON.parse(atob(token.split(".")[1]));
}
