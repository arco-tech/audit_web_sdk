import * as FormLogic from "./FormLogic.js";
import * as Locations from "./Locations.js";
import * as Questions from "./Questions.js";
import { validate } from "./Validation.js";
const storageID = "formState";
export class FormState {
    static initiate(saver) {
        const stateData = {
            currentSectionID: null,
            values: {},
            filteredSectionIDs: [],
            isComplete: false,
            hasSubmitted: false,
            metadata: {},
            trashed: false,
            migratePublishedFormID: null,
            details: {
                email: "",
                first_name: "",
                last_name: "",
                gender: null,
                company_name: "",
                location_id: null,
                industry_id: null,
                sent_help_request: false,
                number_of_employees: null,
                accepted_terms_and_conditions: false,
            },
        };
        return new FormState(stateData, saver);
    }
    constructor(data, saver) {
        this._data = data;
        this._saver = saver;
    }
    currentSectionID() {
        return this._data.currentSectionID;
    }
    value(questionID) {
        return this._data.values[`${questionID}`];
    }
    detail(name) {
        return this.details()[name];
    }
    metadata() {
        return this._data.metadata || {};
    }
    getMetadata(key) {
        return this._data.metadata[key];
    }
    putMetadata(key, value) {
        this._data.metadata[key] = value;
        this.save();
    }
    filterSections(sections) {
        const filtered = sections.filter((section) => {
            return (section.required() ||
                this._data.filteredSectionIDs.indexOf(section.id()) !== -1);
        });
        return filtered.length === 0 ? sections : filtered;
    }
    isExcludedSection(section) {
        return this._data.filteredSectionIDs.indexOf(section.id()) === -1;
    }
    excludedSections(sections) {
        return sections.filter((section) => {
            return this._data.filteredSectionIDs.indexOf(section.id()) === -1;
        });
    }
    currentSectionIndex(publishedForm) {
        const currentSection = this.findCurrentSection(publishedForm);
        const filteredSections = this.filterSections(publishedForm.form().sections());
        return filteredSections.findIndex((section) => {
            return section.id() === currentSection.id();
        });
    }
    previousSection(publishedForm) {
        const current = this.currentSectionIndex(publishedForm);
        const sections = this.filterSections(publishedForm.form().sections());
        if (sections[current - 1]) {
            this.changeCurrentSectionID(sections[current - 1].id());
        }
    }
    nextSection(publishedForm) {
        const current = this.currentSectionIndex(publishedForm);
        const sections = this.filterSections(publishedForm.form().sections());
        if (sections[current + 1]) {
            this.changeCurrentSectionID(sections[current + 1].id());
        }
    }
    changeCurrentSectionID(sectionID) {
        this._data.currentSectionID = sectionID;
        this._data.isComplete = false;
        this.save();
    }
    changeValue(questionID, value) {
        this._data.values[`${questionID}`] = value;
        this.save();
    }
    changeValues(values) {
        if (typeof values === "object") {
            this._data.values = values;
        }
        else {
            throw new Error("values must be an object");
        }
    }
    changeDetail(name, value) {
        this._data.details[name] = value;
        this.save();
    }
    changeDetails(details) {
        this._data.details = { ...this._data.details, ...details };
        this.save();
    }
    changeFilteredSectionIDs(filteredSectionIDs) {
        this._data.filteredSectionIDs = filteredSectionIDs;
        this.save();
    }
    addFilteredSection(section) {
        if (this._data.filteredSectionIDs.indexOf(section.id()) === -1) {
            this._data.filteredSectionIDs.push(section.id());
        }
    }
    changeIsComplete(isComplete) {
        this._data.isComplete = isComplete;
        this.save();
    }
    changeHasSubmitted(hasSubmitted) {
        this._data.hasSubmitted = hasSubmitted;
        this.save();
    }
    save() {
        this._saver(this);
    }
    findCurrentSection(publishedForm) {
        const sections = this.filterSections(publishedForm.form().sections());
        const currentID = this.currentSectionID();
        return sections.find((section) => {
            return section.id() === currentID;
        }) || sections[0];
    }
    sectionsProgress(sections, ignoreQuestions = []) {
        let total = 0;
        let complete = 0;
        sections.forEach((section) => {
            const { validQuestions } = this.summary(section);
            validQuestions.forEach((question) => {
                if (question.type() !== "multi_button" &&
                    ignoreQuestions.indexOf(question.namedID()) === -1) {
                    total += 1;
                    if (Questions.isComplete(question, this.value(question.id()))) {
                        complete += 1;
                    }
                }
            });
        });
        if (total === 0 && complete === 0) {
            return 0;
        }
        else {
            return (complete / total) * 100;
        }
    }
    sectionProgress(section, ignoreQuestions = []) {
        return this.sectionsProgress(section ? [section] : [], ignoreQuestions);
    }
    summary(section, values) {
        return FormLogic.summary(section, this.location(), values || this.values());
    }
    validate(section) {
        const constraints = {};
        const { validQuestions } = this.summary(section);
        validQuestions
            .filter((question) => this.validateLocalisation(question))
            .forEach((question) => {
            constraints[question.id()] = {
                custom: (value) => {
                    if (Questions.isComplete(question, value)) {
                        return [];
                    }
                    else {
                        return ["This field is required"];
                    }
                },
            };
        });
        return validate(constraints, this.values());
    }
    validateLocalisation(question) {
        const localisation = question.localisation();
        if (localisation && localisation.length > 0) {
            const location = this.location();
            return location && localisation.indexOf(location.countryCode()) !== -1;
        }
        else {
            return true;
        }
    }
    details() {
        return this._data.details;
    }
    values() {
        return { ...this._data.values };
    }
    filteredSectionIDs() {
        return this._data.filteredSectionIDs;
    }
    isComplete() {
        return this._data.isComplete;
    }
    hasSubmitted() {
        return this._data.hasSubmitted;
    }
    isTrashed() {
        return this._data.trashed;
    }
    location() {
        return Locations.location(this._data.details.location_id);
    }
    migratePublishedFormID() {
        return this._data.migratePublishedFormID;
    }
    data() {
        return this._data;
    }
    fullName() {
        return [this.detail("first_name"), this.detail("last_name")]
            .map((name) => (name || "").trim())
            .filter((name) => name)
            .join(" ");
    }
}
//# sourceMappingURL=FormState.js.map