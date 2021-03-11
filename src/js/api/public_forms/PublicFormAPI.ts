import {request} from "./API";
import {PublishedFormData} from "../../PublishedForm";
import {PreviousValues} from "../../PublicFormSubmission"

export function live(publicFormID: string): Promise<PublishedFormData> {
  return request<PublishedFormData>(
    "get",
    `public-forms/${publicFormID}/live`,
  );
}

export function current(): Promise<PublishedFormData> {
  return request<PublishedFormData>("get", "public-forms/current");
}

export function previousSubmissionValues(): Promise<PreviousValues> {
  return request("get", "previous-submission-values")
}
