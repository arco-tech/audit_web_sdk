import {request} from "./API";

export interface CreatePublicUserRequest {
  email: string;
  password: string;
}

export interface PublicUserResponse {
  email: string;
}

export function create(
  authToken: string,
  params: CreatePublicUserRequest,
): Promise<PublicUserResponse> {
  return request<PublicUserResponse>("post", "public-users", {
    jwt: authToken,
  });
}
