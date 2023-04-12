"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previousSubmissionValues = exports.current = exports.get = exports.live = void 0;
var API_1 = require("./API");
function live(publicFormID) {
    return (0, API_1.request)("get", "public-forms/".concat(publicFormID, "/live"));
}
exports.live = live;
function get(publicFormID) {
    return (0, API_1.request)("get", "public-forms/".concat(publicFormID));
}
exports.get = get;
function current() {
    return (0, API_1.request)("get", "public-forms/current");
}
exports.current = current;
function previousSubmissionValues() {
    return (0, API_1.request)("get", "previous-submission-values");
}
exports.previousSubmissionValues = previousSubmissionValues;
//# sourceMappingURL=PublicFormAPI.js.map