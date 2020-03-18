"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var FormState_1 = require("../FormState");
var PublishedFormMocks_1 = require("../tests/PublishedFormMocks");
function mockFormState(data, saver) {
    if (!data.details) {
        data.details = {};
    }
    var mockData = {
        currentSectionID: data.currentSectionID || null,
        values: data.values || {},
        filteredSectionIDs: data.filteredSectionIDs || [],
        isComplete: data.isComplete || false,
        hasSubmitted: data.hasSubmitted || false,
        metadata: { test: true },
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
            accepted_terms_and_conditions: data.details.accepted_terms_and_conditions || false,
        },
    };
    return new FormState_1.FormState(mockData, saver ? saver : function () { });
}
ava_1.default("initiate creates an empty FormState instance", function (t) {
    var formState = FormState_1.FormState.initiate(function () { });
    t.is(formState instanceof FormState_1.FormState, true);
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
ava_1.default("constructs with given data", function (t) {
    var data = {
        currentSectionID: 3,
        values: { 1: "abc", 2: 46, 3: "2019-01-01" },
        filteredSectionIDs: [],
        isComplete: false,
        hasSubmitted: false,
        trashed: false,
        metadata: { some: "thing" },
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
    var formState = new FormState_1.FormState(data, function () { });
    t.is(formState.currentSectionID(), data.currentSectionID);
    t.is(formState.fullName(), data.details.first_name + " " + data.details.last_name);
    t.deepEqual(formState.data(), data);
    t.deepEqual(formState.values(), data.values);
    t.deepEqual(formState.metadata(), data.metadata);
    t.deepEqual(formState.details(), data.details);
});
ava_1.default("value returns the correct value", function (t) {
    var formState = mockFormState({ values: { 1: "abc" } });
    t.is(formState.value(1), "abc");
    t.is(formState.value(2), undefined);
});
ava_1.default("detail returns the correct detail", function (t) {
    var formState = mockFormState({
        details: {
            email: "example@mail.nz",
            first_name: "someone",
        },
    });
    t.is(formState.detail("email"), "example@mail.nz");
    t.is(formState.detail("first_name"), "someone");
});
ava_1.default("changeCurrentSectionID updates the currentSectionID", function (t) {
    return new Promise(function (resolve) {
        var formState = mockFormState({ currentSectionID: 1 }, function () { return resolve(); });
        formState.changeCurrentSectionID(5);
        t.is(formState.currentSectionID(), 5);
    });
});
ava_1.default("changeValue updates the given value", function (t) {
    return new Promise(function (resolve) {
        var formState = mockFormState({ values: { 1: "a" } }, function () { return resolve(); });
        formState.changeValue(1, "b");
        formState.changeValue(2, "c");
        t.deepEqual(formState.values(), { 1: "b", 2: "c" });
    });
});
ava_1.default("changeDetails merges details", function (t) {
    return new Promise(function (resolve) {
        var formState = mockFormState({
            details: {
                email: "someone@mail.nz",
                first_name: "Someone",
            },
        }, function () { return resolve(); });
        formState.changeDetails({
            first_name: "Another",
            last_name: "Person",
        });
        t.is(formState.detail("email"), "someone@mail.nz");
        t.is(formState.detail("first_name"), "Another");
        t.is(formState.detail("last_name"), "Person");
    });
});
ava_1.default("save calls saver function with FormState", function (t) {
    return new Promise(function (resolve) {
        var formState = mockFormState({}, function (formStateParam) {
            t.deepEqual(formState, formStateParam);
            resolve();
        });
        formState.save();
    });
});
ava_1.default("findCurrentSection returns the correct section", function (t) {
    var publishedForm = PublishedFormMocks_1.mockPublishedForm({
        form: PublishedFormMocks_1.mockFormData({
            sections: [
                PublishedFormMocks_1.mockSectionData({ id: 1, name: "Section 1" }),
                PublishedFormMocks_1.mockSectionData({ id: 2, name: "Section 2" }),
                PublishedFormMocks_1.mockSectionData({ id: 3, name: "Section 3" }),
            ],
        }),
    });
    var formState = mockFormState({
        currentSectionID: null,
        filteredSectionIDs: [2, 3],
    });
    var firstSection = formState.findCurrentSection(publishedForm);
    t.is(firstSection.name(), "Section 2");
    formState.changeCurrentSectionID(3);
    var secondSection = formState.findCurrentSection(publishedForm);
    t.is(secondSection.name(), "Section 3");
});
ava_1.default("sectionProgress returns the correct percentage", function (t) {
    var section = PublishedFormMocks_1.mockSection({
        questions: [
            PublishedFormMocks_1.mockQuestionData({ id: 1, type: "multi_button" }),
            PublishedFormMocks_1.mockQuestionData({ id: 2, type: "text", named_id: "ignored" }),
            PublishedFormMocks_1.mockQuestionData({ id: 3, type: "text" }),
            PublishedFormMocks_1.mockQuestionData({ id: 4, type: "multi_text" }),
            PublishedFormMocks_1.mockQuestionData({ id: 5, type: "number" }),
            PublishedFormMocks_1.mockQuestionData({ id: 6, type: "date" }),
        ],
    });
    var formState = mockFormState({});
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
//# sourceMappingURL=FormState.test.js.map