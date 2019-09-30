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
var FormLogic = require("./FormLogic");
var Locations = require("./Locations");
var Questions = require("./Questions");
var Validation_1 = require("./Validation");
var storageID = "formState";
var FormState = /** @class */ (function () {
    function FormState(data, saver) {
        this._data = data;
        this._saver = saver;
    }
    FormState.initiate = function (saver) {
        var stateData = {
            currentSectionID: null,
            values: {},
            filteredSectionIDs: [],
            isComplete: false,
            hasSubmitted: false,
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
    };
    FormState.prototype.currentSectionID = function () {
        return this._data.currentSectionID;
    };
    FormState.prototype.value = function (questionID) {
        return this._data.values["" + questionID];
    };
    FormState.prototype.detail = function (name) {
        return this.details()[name];
    };
    FormState.prototype.filterSections = function (sections) {
        var _this = this;
        return sections.filter(function (section) {
            return (section.required() ||
                _this._data.filteredSectionIDs.indexOf(section.id()) !== -1);
        });
    };
    FormState.prototype.isExcludedSection = function (section) {
        return this._data.filteredSectionIDs.indexOf(section.id()) === -1;
    };
    FormState.prototype.excludedSections = function (sections) {
        var _this = this;
        return sections.filter(function (section) {
            return _this._data.filteredSectionIDs.indexOf(section.id()) === -1;
        });
    };
    FormState.prototype.currentSectionIndex = function (publishedForm) {
        var currentSection = this.findCurrentSection(publishedForm);
        var filteredSections = this.filterSections(publishedForm.form().sections());
        return filteredSections.findIndex(function (section) {
            return section.id() === currentSection.id();
        });
    };
    FormState.prototype.previousSection = function (publishedForm) {
        var current = this.currentSectionIndex(publishedForm);
        var sections = this.filterSections(publishedForm.form().sections());
        if (sections[current - 1]) {
            this.changeCurrentSectionID(sections[current - 1].id());
        }
    };
    FormState.prototype.nextSection = function (publishedForm) {
        var current = this.currentSectionIndex(publishedForm);
        var sections = this.filterSections(publishedForm.form().sections());
        if (sections[current + 1]) {
            this.changeCurrentSectionID(sections[current + 1].id());
        }
    };
    FormState.prototype.changeCurrentSectionID = function (sectionID) {
        this._data.currentSectionID = sectionID;
        this._data.isComplete = false;
        this.save();
    };
    FormState.prototype.changeValue = function (questionID, value) {
        this._data.values["" + questionID] = value;
        this.save();
    };
    FormState.prototype.changeDetail = function (name, value) {
        this._data.details[name] = value;
        this.save();
    };
    FormState.prototype.changeDetails = function (details) {
        this._data.details = __assign(__assign({}, this._data.details), details);
        this.save();
    };
    FormState.prototype.changeFilteredSectionIDs = function (filteredSectionIDs) {
        this._data.filteredSectionIDs = filteredSectionIDs;
        this.save();
    };
    FormState.prototype.addFilteredSection = function (section) {
        if (this._data.filteredSectionIDs.indexOf(section.id()) === -1) {
            this._data.filteredSectionIDs.push(section.id());
        }
    };
    FormState.prototype.changeIsComplete = function (isComplete) {
        this._data.isComplete = isComplete;
        this.save();
    };
    FormState.prototype.changeHasSubmitted = function (hasSubmitted) {
        this._data.hasSubmitted = hasSubmitted;
        this.save();
    };
    FormState.prototype.save = function () {
        this._saver(this);
    };
    FormState.prototype.findCurrentSection = function (publishedForm) {
        var sections = this.filterSections(publishedForm.form().sections());
        var currentID = this.currentSectionID();
        return sections.find(function (section) {
            return section.id() === currentID;
        }) || sections[0];
    };
    FormState.prototype.sectionProgress = function (section) {
        var _this = this;
        var validQuestions = this.summary(section).validQuestions;
        var statuses = validQuestions
            .filter(function (question) { return question.type() !== "multi_button"; })
            .map(function (question) {
            return Questions.isComplete(question, _this.value(question.id()));
        });
        var completed = statuses.filter(function (complete) { return complete; });
        return (completed.length / statuses.length) * 100;
    };
    FormState.prototype.summary = function (section) {
        return FormLogic.summary(section, this.location(), this.values());
    };
    FormState.prototype.validate = function (section) {
        var _this = this;
        var constraints = {};
        var validQuestions = this.summary(section).validQuestions;
        validQuestions
            .filter(function (question) { return _this.validateLocalisation(question); })
            .forEach(function (question) {
            constraints[question.id()] = {
                custom: function (value) {
                    if (Questions.isComplete(question, value)) {
                        return [];
                    }
                    else {
                        return ["This field is required"];
                    }
                },
            };
        });
        return Validation_1.validate(constraints, this.values());
    };
    FormState.prototype.validateLocalisation = function (question) {
        var localisation = question.localisation();
        if (localisation && localisation.length > 0) {
            var location_1 = this.location();
            return location_1 && localisation.indexOf(location_1.countryCode()) !== -1;
        }
        else {
            return true;
        }
    };
    FormState.prototype.details = function () {
        return this._data.details;
    };
    FormState.prototype.values = function () {
        return __assign({}, this._data.values);
    };
    FormState.prototype.filteredSectionIDs = function () {
        return this._data.filteredSectionIDs;
    };
    FormState.prototype.isComplete = function () {
        return this._data.isComplete;
    };
    FormState.prototype.hasSubmitted = function () {
        return this._data.hasSubmitted;
    };
    FormState.prototype.location = function () {
        return Locations.location(this._data.details.location_id);
    };
    FormState.prototype.data = function () {
        return this._data;
    };
    FormState.prototype.fullName = function () {
        return [this.detail("first_name"), this.detail("last_name")]
            .map(function (name) { return (name || "").trim(); })
            .filter(function (name) { return name; })
            .join(" ");
    };
    return FormState;
}());
exports.FormState = FormState;
//# sourceMappingURL=FormState.js.map