import {FormState, FormStateValues} from "../../FormState";
import {PublicFormSubmissionData} from "../../PublicFormSubmission";
import {PublishedForm} from "../../PublishedForm";
import {request} from "./API";

interface PublicFormSubmissionParams {
  email: string;
  first_name: string;
  last_name: string;
  gender: string | null;
  company_name: string;
  location_id: number | null;
  industry_id: string | null;
  number_of_employees: number | null;
  has_submitted: boolean;
  values: FormStateValues;
  filtered_section_ids: number[];
}

export function current(): Promise<PublicFormSubmissionData> {
  return request<PublicFormSubmissionData>(
    "get",
    "public-form-submissions/current",
  );
}

export function update(
  formState: FormState,
): Promise<PublicFormSubmissionData> {
  return request<PublicFormSubmissionData>("put", "public-form-submissions", {
    body: {
      public_form_submission: formStateToParams(formState),
    },
  });
}

export function requestReturnLink(email: string): Promise<null> {
  return request<null>("patch", "public-form-submissions/request-return-link", {
    body: {email}
  });
}

function formStateToParams(formState: FormState): PublicFormSubmissionParams {
  return {
    email: formState.detail("email"),
    first_name: formState.detail("first_name"),
    last_name: formState.detail("last_name"),
    gender: formState.detail("gender"),
    company_name: formState.detail("company_name"),
    location_id: formState.detail("location_id"),
    industry_id: formState.detail("industry_id"),
    number_of_employees: formState.detail("number_of_employees"),
    has_submitted: formState.hasSubmitted(),
    values: formState.values(),
    filtered_section_ids: formState.filteredSectionIDs(),
  };
}