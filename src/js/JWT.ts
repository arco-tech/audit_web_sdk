export interface JWTPayload {
  [key: string]: any;
}

function fromBase64(base64: string): string {
  if (window.atob) {
    return window.atob(base64);
  } else {
    return Buffer.from(base64, "base64").toString();
  }
}

export function decodePayload(token: string): JWTPayload {
  return JSON.parse(fromBase64(token.split(".")[1]));
}

export function isValid(token: string | null | undefined): boolean {
  if (!token) { return false; }
  const now = new Date();
  const {exp} = decodePayload(token);
  const expires = new Date(exp * 1000);
  return expires.getTime() > now.getTime();
}
