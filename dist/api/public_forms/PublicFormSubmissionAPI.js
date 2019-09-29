"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
function current() {
    return API_1.request("get", "public-form-submissions/current");
}
exports.current = current;
function update(formState) {
    return API_1.request("put", "public-form-submissions", {
        body: {
            public_form_submission: formStateToParams(formState),
        },
    });
}
exports.update = update;
function requestReturnLink(email) {
    return API_1.request("patch", "public-form-submissions/request-return-link", {
        body: { email: email }
    });
}
exports.requestReturnLink = requestReturnLink;
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
    };
}
//# sourceMappingURL=PublicFormSubmissionAPI.js.map