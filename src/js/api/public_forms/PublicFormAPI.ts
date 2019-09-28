import {PublishedFormData} from "../../PublishedForm";
import {request} from "./API";

export function live(publicFormID: string): Promise<PublishedFormData> {
  return request<PublishedFormData>(
    "get",
    `public-forms/${publicFormID}/live`,
  );
}

export function current(): Promise<PublishedFormData> {
  return request<PublishedFormData>("get", "public-forms/current");
}
