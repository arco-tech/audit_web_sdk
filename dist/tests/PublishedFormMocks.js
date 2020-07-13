"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var PublishedForm_1 = require("../PublishedForm");
function mockPublishedForm(attrs) {
    return new PublishedForm_1.PublishedForm(__assign({ id: 1, version: "1.0", inserted_at: "2019-01-01T00:00:00", form: mockFormData(attrs.form || {}), form_type_id: 1 }, attrs));
}
exports.mockPublishedForm = mockPublishedForm;
function mockFormData(attrs) {
    return __assign({ id: 1, sections: [] }, attrs);
}
exports.mockFormData = mockFormData;
function mockSection(attrs) {
    return new PublishedForm_1.PublishedFormSection(mockSectionData(attrs));
}
exports.mockSection = mockSection;
function mockSectionData(attrs) {
    return __assign({ id: 1, index: 1, name: "Section", summary: "Some section", questions: [], icon: null, service_type: null, required: false }, attrs);
}
exports.mockSectionData = mockSectionData;
function mockQuestion(attrs) {
    return new PublishedForm_1.PublishedFormQuestion(mockQuestionData(attrs));
}
exports.mockQuestion = mockQuestion;
function mockQuestionData(attrs) {
    return __assign({ id: 1, type: "text", index: 1, named_id: "some_id", note: "Note", info: "Info", label: "Some question?", goes_to: { type: "next_question" }, localisation: null, options: [], service_type: null }, attrs);
}
exports.mockQuestionData = mockQuestionData;
function mockOptionData(attrs) {
    return __assign({ id: 1, label: "Some option", index: 1, actions: [], goes_to: { type: "next_question" } }, attrs);
}
exports.mockOptionData = mockOptionData;
//# sourceMappingURL=PublishedFormMocks.js.map