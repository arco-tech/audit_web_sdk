import {
  PublishedForm,
  PublishedFormFormData,
  PublishedFormOptionData,
  PublishedFormQuestion,
  PublishedFormQuestionData,
  PublishedFormSection,
  PublishedFormSectionData,
  PublishedFormSectionIcon,
  PublishedFormSectionIconData,
} from "../PublishedForm";

export function mockPublishedForm(attrs: {[key: string]: any}): PublishedForm {
  return new PublishedForm({
    id: 1,
    version: "1.0",
    inserted_at: "2019-01-01T00:00:00",
    form: mockFormData(attrs.form || {}),
    ...attrs,
  });
}

export function mockFormData(attrs: {[key: string]: any}): PublishedFormFormData {
  return {
    id: 1,
    sections: [],
    ...attrs,
  };
}

export function mockSection(attrs: {[key: string]: any}): PublishedFormSection {
  return new PublishedFormSection(mockSectionData(attrs));
}

export function mockSectionData(
  attrs: {[key: string]: any},
): PublishedFormSectionData {
  return {
    id: 1,
    index: 1,
    name: "Section",
    summary: "Some section",
    questions: [],
    icon: null,
    service_type: null,
    required: false,
    ...attrs,
  };
}

export function mockQuestion(attrs: {[key: string]: any}): PublishedFormQuestion {
  return new PublishedFormQuestion(mockQuestionData(attrs));
}

export function mockQuestionData(
  attrs: {[key: string]: any},
): PublishedFormQuestionData {
  return {
    id: 1,
    type: "text",
    index: 1,
    label: "Some question?",
    goes_to: {type: "next_question"},
    localisation: null,
    options: [],
    service_type: null,
    ...attrs,
  };
}

export function mockOptionData(
  attrs: {[key: string]: any},
): PublishedFormOptionData {
  return {
    id: 1,
    label: "Some option",
    index: 1,
    actions: [],
    goes_to: {type: "next_question"},
    ...attrs,
  };
}
