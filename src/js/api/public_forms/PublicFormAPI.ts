import {request} from "./API";
import {PublishedFormData} from "../../PublishedForm";
import {PreviousValues} from "../../PublicFormSubmission"
import { PublicFormData } from "../../PublicForm";

export function live(publicFormID: string): Promise<PublishedFormData> {
  return request<PublishedFormData>(
    "get",
    `public-forms/${publicFormID}/live`,
  );
}

export function get(publicFormID: string): Promise<PublicFormData> {
  return request<PublicFormData>("get", `public-forms/${publicFormID}`)
}

export function current(): Promise<PublishedFormData> {
  return request<PublishedFormData>("get", "public-forms/current");
}

export function previousSubmissionValues(): Promise<PreviousValues> {
  return request("get", "previous-submission-values")
}
