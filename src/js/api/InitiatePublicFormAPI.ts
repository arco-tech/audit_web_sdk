import {request} from "./API";
import {PublicFormSubmissionData} from "../PublicFormSubmission";

export interface InitiatePublicFormResponse {
  token: string;
  public_form_submission: PublicFormSubmissionData;
}

export function initiate(
  initiateToken: string,
): Promise<InitiatePublicFormResponse> {
  return request<InitiatePublicFormResponse>("post", "initiate-public-form", {
    jwt: initiateToken,
  });
}
