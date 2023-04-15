import { request } from "./API.js";
export function current() {
    return request("get", "public-form-submissions/current");
}
export function create(publicFormNamedID, publishedFormID, params) {
    return request("post", "public-form-submissions", {
        body: {
            public_form_named_id: publicFormNamedID,
            published_form_id: publishedFormID,
            public_form_submission: params,
        },
    });
}
export function update(formState) {
    return request("put", "public-form-submissions", {
        body: {
            public_form_submission: formStateToParams(formState),
        },
    });
}
export function migrate() {
    return request("patch", "public-form-submissions/migrate");
}
export function requestReturnLink(formType, email) {
    return request("patch", "public-form-submissions/request-return-link", {
        body: { email, public_form_named_id: formType },
    });
}
function formStateToParams(formState) {
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
        metadata: formState.metadata(),
    };
}
//# sourceMappingURL=PublicFormSubmissionAPI.js.map