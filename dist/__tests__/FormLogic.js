"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var FormLogic = require("../FormLogic");
var _PublishedFormMocks_1 = require("./_PublishedFormMocks");
var publishedForm = _PublishedFormMocks_1.mockPublishedForm({
    form: _PublishedFormMocks_1.mockFormData({
        sections: [
            _PublishedFormMocks_1.mockSectionData({
                id: 1,
                questions: [
                    _PublishedFormMocks_1.mockQuestionData({
                        id: 1,
                        type: "button",
                        options: [
                            _PublishedFormMocks_1.mockOptionData({
                                id: 1,
                                goes_to: { type: "question", id: 3 },
                            }),
                        ],
                    }),
                    _PublishedFormMocks_1.mockQuestionData({
                        id: 2,
                        type: "text",
                    }),
                    _PublishedFormMocks_1.mockQuestionData({
                        id: 3,
                        type: "text",
                        goes_to: { type: "next_section" },
                    }),
                    _PublishedFormMocks_1.mockQuestionData({
                        id: 4,
                        type: "text",
                    }),
                ],
            }),
        ],
    }),
});
ava_1.default("summary", function (t) {
    var section = publishedForm.form().sections()[0];
    var _a = FormLogic.summary(section, null, {
        1: 1,
        2: "anything",
        3: "anything",
        4: "anything",
    }), validQuestions = _a.validQuestions, ignoredQuestions = _a.ignoredQuestions;
    var validQuestionIDs = validQuestions.map(function (question) { return question.id(); });
    var ignoredQuestionIDs = ignoredQuestions.map(function (question) { return question.id(); });
    t.deepEqual(validQuestionIDs, [1, 3]);
    t.deepEqual(ignoredQuestionIDs, [2, 4]);
});
//# sourceMappingURL=FormLogic.js.map