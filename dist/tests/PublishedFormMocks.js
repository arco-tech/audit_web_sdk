import { PublishedForm, PublishedFormQuestion, PublishedFormSection, } from "../PublishedForm.js";
export function mockPublishedForm(attrs) {
    return new PublishedForm({
        id: 1,
        version: "1.0",
        inserted_at: "2019-01-01T00:00:00",
        form: mockFormData(attrs.form || {}),
        form_type_id: 1,
        ...attrs,
    });
}
export function mockFormData(attrs) {
    return {
        id: 1,
        sections: [],
        ...attrs,
    };
}
export function mockSection(attrs) {
    return new PublishedFormSection(mockSectionData(attrs));
}
export function mockSectionData(attrs) {
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
export function mockQuestion(attrs) {
    return new PublishedFormQuestion(mockQuestionData(attrs));
}
export function mockQuestionData(attrs) {
    return {
        id: 1,
        type: "text",
        index: 1,
        named_id: "some_id",
        note: "Note",
        info: "Info",
        label: "Some question?",
        fieldset: null,
        goes_to: { type: "next_question" },
        localisation: null,
        options: [],
        service_type: null,
        ...attrs,
    };
}
export function mockOptionData(attrs) {
    return {
        id: 1,
        label: "Some option",
        index: 1,
        actions: [],
        controls_fieldset: null,
        goes_to: { type: "next_question" },
        ...attrs,
    };
}
//# sourceMappingURL=PublishedFormMocks.js.map