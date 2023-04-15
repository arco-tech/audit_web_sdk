import { request } from "./API.js";
export function live(publicFormID) {
    return request("get", `public-forms/${publicFormID}/live`);
}
export function get(publicFormID) {
    return request("get", `public-forms/${publicFormID}`);
}
export function current() {
    return request("get", "public-forms/current");
}
export function previousSubmissionValues() {
    return request("get", "previous-submission-values");
}
//# sourceMappingURL=PublicFormAPI.js.map