import {FormStateData} from "./FormState";

export interface PublicFormSubmissionData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  company_name: string;
  number_of_employees: number;
  location_id: number | null;
  industry_id: number | null;
  has_submitted: boolean;
  values: {[questionID: string]: any};
  filtered_section_ids: number[];
  metadata: {[key: string]: any};
  inserted_at: string;
  updated_at: string;
}

export function stateDataFromSubmissionData(
  submission: PublicFormSubmissionData,
): FormStateData {
  return {
    currentSectionID: null,
    values: submission.values,
    filteredSectionIDs: submission.filtered_section_ids,
    hasSubmitted: submission.has_submitted,
    isComplete: false,
    metadata: submission.metadata || {},
    details: {
      email: submission.email,
      first_name: submission.first_name,
      last_name: submission.last_name,
      gender: submission.gender,
      company_name: submission.company_name,
      number_of_employees: submission.number_of_employees,
      location_id: submission.location_id,
      industry_id: submission.industry_id,
      sent_help_request: false,
      accepted_terms_and_conditions: true,
    },
  };
}
