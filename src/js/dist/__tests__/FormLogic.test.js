"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var FormLogic = require("../FormLogic");
var PublishedFormMocks_1 = require("../tests/PublishedFormMocks");
var publishedForm = PublishedFormMocks_1.mockPublishedForm({
    form: PublishedFormMocks_1.mockFormData({
        sections: [
            PublishedFormMocks_1.mockSectionData({
                id: 1,
                questions: [
                    PublishedFormMocks_1.mockQuestionData({
                        id: 1,
                        type: "button",
                        options: [
                            PublishedFormMocks_1.mockOptionData({
                                id: 1,
                                goes_to: { type: "question", id: 3 },
                            }),
                        ],
                    }),
                    PublishedFormMocks_1.mockQuestionData({
                        id: 2,
                        type: "text",
                    }),
                    PublishedFormMocks_1.mockQuestionData({
                        id: 3,
                        type: "text",
                        goes_to: { type: "next_section" },
                    }),
                    PublishedFormMocks_1.mockQuestionData({
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
//# sourceMappingURL=FormLogic.test.js.map