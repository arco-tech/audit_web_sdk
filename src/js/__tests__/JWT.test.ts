import test from "ava";
import {decodePayload, isValid} from "../JWT";

function toBase64(content: string): string {
  return Buffer.from(content).toString("base64");
}

function mockToken(payload: {[key: string]: any}): string {
  const encodedHeader = toBase64(JSON.stringify({
    alg: "HS512",
    typ: "JWT",
  }));
  const encodedPayload = toBase64(JSON.stringify(payload));
  return `${encodedHeader}.${encodedPayload}.abc123`;
}

test("decodePayload", (t) => {
  const token = mockToken({test: "value"});
  t.deepEqual(decodePayload(token), {test: "value"});
});

test("isValid", (t) => {
  const expiredTime = Math.floor(new Date().getTime() / 1000) - 1;
  const expiredToken = mockToken({exp: expiredTime});
  t.is(isValid(expiredToken), false);
  const validTime = Math.ceil(new Date().getTime() / 1000) + 1;
  const validToken = mockToken({exp: validTime});
  t.is(isValid(validToken), true);
});
