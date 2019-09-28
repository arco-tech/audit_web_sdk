import {request} from "./API";
import {PublishedFormData} from "../../PublishedForm";

export function live(publicFormID: string): Promise<PublishedFormData> {
  return request<PublishedFormData>(
    "get",
    `public-forms/${publicFormID}/live`,
  );
}

export function current(): Promise<PublishedFormData> {
  return request<PublishedFormData>("get", "public-forms/current");
}
