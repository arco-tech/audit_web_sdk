"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
function current() {
    return API_1.request("get", "public-form-submissions/current");
}
exports.current = current;
function create(publicFormNamedID, publishedFormID, params) {
    return API_1.request("post", "public-form-submissions", {
        body: {
            data: {
                public_form_named_id: publicFormNamedID,
                published_form_id: publishedFormID,
                public_form_submission: params,
            },
        },
    });
}
exports.create = create;
function update(formState) {
    return API_1.request("put", "public-form-submissions", {
        body: {
            public_form_submission: formStateToParams(formState),
        },
    });
}
exports.update = update;
function migrate() {
    return API_1.request("patch", "public-form-submissions/migrate");
}
exports.migrate = migrate;
function requestReturnLink(formType, email) {
    return API_1.request("patch", "public-form-submissions/request-return-link", {
        body: { email: email, public_form_named_id: formType },
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
        metadata: formState.metadata(),
    };
}
//# sourceMappingURL=PublicFormSubmissionAPI.js.map