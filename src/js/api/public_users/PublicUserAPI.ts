import {request} from "./API";

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
  });
}
