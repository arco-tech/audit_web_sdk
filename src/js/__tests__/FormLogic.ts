import test from "ava";
import * as FormLogic from "../FormLogic";
import {
  mockFormData,
  mockOptionData,
  mockPublishedForm,
  mockQuestionData,
  mockSectionData,
} from "./_PublishedFormMocks";

const publishedForm = mockPublishedForm({
  form: mockFormData({
    sections: [
      mockSectionData({
        id: 1,
        questions: [
          mockQuestionData({
            id: 1,
            type: "button",
            options: [
              mockOptionData({
                id: 1,
                goes_to: {type: "question", id: 3},
              }),
            ],
          }),
          mockQuestionData({
            id: 2,
            type: "text",
          }),
          mockQuestionData({
            id: 3,
            type: "text",
            goes_to: {type: "next_section"},
          }),
          mockQuestionData({
            id: 4,
            type: "text",
          }),
        ],
      }),
    ],
  }),
});

test("summary", (t) => {
  const section = publishedForm.form().sections()[0];
  const {validQuestions, ignoredQuestions} = FormLogic.summary(section, null, {
    1: 1,
    2: "anything",
    3: "anything",
    4: "anything",
  });
  const validQuestionIDs = validQuestions.map((question) => question.id());
  const ignoredQuestionIDs = ignoredQuestions.map((question) => question.id());
  t.deepEqual(validQuestionIDs, [1, 3]);
  t.deepEqual(ignoredQuestionIDs, [2, 4]);
});
