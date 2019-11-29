import {request} from "./API";
import {
  InitiatePublicFormResponse,
} from "../public_forms/InitiateAPI";

export interface CreatePublicUserRequest {
  password: string;
}

export interface PublicUserResponse {
  email: string;
}

export function create(
  authToken: string,
  params: CreatePublicUserRequest,
): Promise<PublicUserResponse> {
  return request<PublicUserResponse>("post", "", {
    jwt: authToken,
    body: {public_user: params},
  });
}

export function authenticate_form(
  publicFormID: string,
  email: string,
  password: string,
): Promise<InitiatePublicFormResponse> {
  return request<InitiatePublicFormResponse>("post", "authenticate", {
    body: {
      resource: "public_form.submission",
      public_form: publicFormID,
      public_user: {email, password},
    },
  });
}
