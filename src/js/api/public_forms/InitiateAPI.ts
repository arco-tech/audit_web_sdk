import {request} from "./API.js";
import {PublicFormSubmissionData} from "../../PublicFormSubmission.js";

export interface InitiatePublicFormResponse {
  token: string;
  create_public_user_token?: string;
  public_form_submission: PublicFormSubmissionData;
}

export function initiate(
  initiateToken: string,
): Promise<InitiatePublicFormResponse> {
  return request<InitiatePublicFormResponse>("post", "initiate", {
    jwt: initiateToken,
  });
}
