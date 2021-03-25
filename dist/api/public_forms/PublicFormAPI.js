"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
function live(publicFormID) {
    return API_1.request("get", "public-forms/" + publicFormID + "/live");
}
exports.live = live;
function current() {
    return API_1.request("get", "public-forms/current");
}
exports.current = current;
function previousSubmissionValues() {
    return API_1.request("get", "previous-submission-values");
}
exports.previousSubmissionValues = previousSubmissionValues;
//# sourceMappingURL=PublicFormAPI.js.map