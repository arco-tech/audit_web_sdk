import test from "ava";
import {FormState, FormStateSaver} from "../FormState";
import {PublishedForm} from "../PublishedForm";
import {
  mockFormData,
  mockPublishedForm,
  mockQuestionData,
  mockSection,
  mockSectionData,
} from "../tests/PublishedFormMocks";

function mockFormState(
  data: {[key: string]: any},
  saver?: FormStateSaver,
): FormState {
  if (!data.details) { data.details = {}; }
  const mockData = {
    currentSectionID: data.currentSectionID || null,
    values: data.values || {},
    filteredSectionIDs: data.filteredSectionIDs || [],
    isComplete: data.isComplete || false,
    hasSubmitted: data.hasSubmitted || false,
    metadata: {test: true},
    trashed: false,
    details: {
      email: data.details.email || "",
      first_name: data.details.first_name || "",
      last_name: data.details.last_name || "",
      gender: data.details.gender || null,
      company_name: data.details.company_name || "",
      location_id: data.details.location_id || null,
      industry_id: data.details.industry_id || null,
      sent_help_request: data.details.sent_help_request || false,
      number_of_employees: data.details.number_of_employees || null,
      accepted_terms_and_conditions:
        data.details.accepted_terms_and_conditions || false,
    },
  };
  return new FormState(mockData, saver ? saver : () => {});
}

test("initiate creates an empty FormState instance", (t) => {
  const formState = FormState.initiate(() => {});
  t.is(formState instanceof FormState, true);
  t.is(formState.isTrashed(), false);
  t.deepEqual(formState.values(), {});
  t.deepEqual(formState.metadata(), {});
  t.deepEqual(formState.details(), {
    email: "",
    first_name: "",
    last_name: "",
    gender: null,
    industry_id: null,
    sent_help_request: false,
    company_name: "",
    location_id: null,
    number_of_employees: null,
    accepted_terms_and_conditions: false,
  });
});

test("constructs with given data", (t) => {
  const data = {
    currentSectionID: 3,
    values: {1: "abc", 2: 46, 3: "2019-01-01"},
    filteredSectionIDs: [],
    isComplete: false,
    hasSubmitted: false,
    trashed: false,
    metadata: {some: "thing"},
    details: {
      email: "someone@mail.nz",
      first_name: "Jack",
      last_name: "Frost",
      company_name: "Winter",
      gender: "male",
      location_id: 60,
      industry_id: 45,
      sent_help_request: false,
      number_of_employees: 3,
      accepted_terms_and_conditions: true,
    },
  };
  const formState = new FormState(data, () => {});
  t.is(formState.currentSectionID(), data.currentSectionID);
  t.is(formState.fullName(),
    `${data.details.first_name} ${data.details.last_name}`);
  t.deepEqual(formState.data(), data);
  t.deepEqual(formState.values(), data.values);
  t.deepEqual(formState.metadata(), data.metadata);
  t.deepEqual(formState.details(), data.details);
});

test("value returns the correct value", (t) => {
  const formState = mockFormState({values: {1: "abc"}});
  t.is(formState.value(1), "abc");
  t.is(formState.value(2), undefined);
});

test("detail returns the correct detail", (t) => {
  const formState =
    mockFormState({
      details: {
        email: "example@mail.nz",
        first_name: "someone",
      },
    });
  t.is(formState.detail("email"), "example@mail.nz");
  t.is(formState.detail("first_name"), "someone");
});

test("changeCurrentSectionID updates the currentSectionID", (t) => {
  return new Promise((resolve) => {
    const formState = mockFormState({currentSectionID: 1}, () => resolve());
    formState.changeCurrentSectionID(5);
    t.is(formState.currentSectionID(), 5);
  });
});

test("changeValue updates the given value", (t) => {
  return new Promise((resolve) => {
    const formState = mockFormState({values: {1: "a"}}, () => resolve());
    formState.changeValue(1, "b");
    formState.changeValue(2, "c");
    t.deepEqual(formState.values(), {1: "b", 2: "c"});
  });
});

test("changeDetails merges details", (t) => {
  return new Promise((resolve) => {
    const formState =
      mockFormState(
        {
          details: {
            email: "someone@mail.nz",
            first_name: "Someone",
          },
        },
        () => resolve(),
      );
    formState.changeDetails({
      first_name: "Another",
      last_name: "Person",
    });
    t.is(formState.detail("email"), "someone@mail.nz");
    t.is(formState.detail("first_name"), "Another");
    t.is(formState.detail("last_name"), "Person");
  });
});

test("save calls saver function with FormState", (t) => {
  return new Promise((resolve) => {
    const formState =
      mockFormState({}, (formStateParam: FormState) => {
        t.deepEqual(formState, formStateParam);
        resolve();
      });
    formState.save();
  });
});

test("findCurrentSection returns the correct section", (t) => {
  const publishedForm =
    mockPublishedForm({
      form: mockFormData({
        sections: [
          mockSectionData({id: 1, name: "Section 1"}),
          mockSectionData({id: 2, name: "Section 2"}),
          mockSectionData({id: 3, name: "Section 3"}),
        ],
      }),
    });
  const formState = mockFormState({
    currentSectionID: null,
    filteredSectionIDs: [2, 3],
  });
  const firstSection = formState.findCurrentSection(publishedForm);
  t.is(firstSection.name(), "Section 2");
  formState.changeCurrentSectionID(3);
  const secondSection = formState.findCurrentSection(publishedForm);
  t.is(secondSection.name(), "Section 3");
});

test("sectionProgress returns the correct percentage", (t) => {
  const section =
    mockSection({
      questions: [
        mockQuestionData({id: 1, type: "multi_button"}),
        mockQuestionData({id: 2, type: "text", named_id: "ignored"}),
        mockQuestionData({id: 3, type: "text"}),
        mockQuestionData({id: 4, type: "multi_text"}),
        mockQuestionData({id: 5, type: "number"}),
        mockQuestionData({id: 6, type: "date"}),
      ],
    });
  const formState = mockFormState({});
  t.is(formState.sectionProgress(section, ["ignored"]), 0);
  formState.changeValue(3, "some text");
  t.is(formState.sectionProgress(section), 20);
  t.is(formState.sectionProgress(section, ["ignored"]), 25);
  formState.changeValue(4, ["something"]);
  t.is(formState.sectionProgress(section, ["ignored"]), 50);
  formState.changeValue(5, 23);
  t.is(formState.sectionProgress(section, ["ignored"]), 75);
  formState.changeValue(6, "2019-01-01");
  t.is(formState.sectionProgress(section, ["ignored"]), 100);
});
