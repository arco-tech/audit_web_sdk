"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stateDataFromSubmissionData(submission) {
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
exports.stateDataFromSubmissionData = stateDataFromSubmissionData;
//# sourceMappingURL=PublicFormSubmission.js.map