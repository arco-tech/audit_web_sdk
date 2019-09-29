"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormState_1 = require("./FormState");
var PublishedForm_1 = require("./PublishedForm");
var cache = {
    publishedForm: null,
    formState: null,
};
var publishedFormKey = "publishedForm";
var formStateKey = "formState";
var formSubmissionKey = "publicFormSubmission";
var authTokenKey = "authToken";
function loadPublishedForm() {
    if (cache.publishedForm) {
        return cache.publishedForm;
    }
    else {
        try {
            var data = JSON.parse(window.sessionStorage.getItem(publishedFormKey));
            if (data.id && data.form && Array.isArray(data.form.sections)) {
                cache.publishedForm = new PublishedForm_1.PublishedForm(data);
                return cache.publishedForm;
            }
            else {
                throw new Error("invalid");
            }
        }
        catch (error) {
            return null;
        }
    }
}
exports.loadPublishedForm = loadPublishedForm;
function savePublishedForm(publishedForm) {
    cache.publishedForm = publishedForm;
    window.sessionStorage.setItem(publishedFormKey, JSON.stringify(publishedForm.data()));
}
exports.savePublishedForm = savePublishedForm;
function loadFormState() {
    if (cache.formState) {
        return cache.formState;
    }
    else {
        try {
            var stateData = JSON.parse(window.sessionStorage.getItem(formStateKey));
            if (stateData.values && stateData.details) {
                cache.formState = new FormState_1.FormState(stateData, saveFormState);
                return cache.formState;
            }
            else {
                throw new Error("invalid");
            }
        }
        catch (error) {
            return null;
        }
    }
}
exports.loadFormState = loadFormState;
function saveFormState(state) {
    cache.formState = state;
    window.sessionStorage.setItem(formStateKey, state ? JSON.stringify(state.data()) : null);
}
exports.saveFormState = saveFormState;
function saveAuthToken(token) {
    window.sessionStorage.setItem(authTokenKey, token);
}
exports.saveAuthToken = saveAuthToken;
function loadAuthToken() {
    return window.sessionStorage.getItem(authTokenKey);
}
exports.loadAuthToken = loadAuthToken;
//# sourceMappingURL=Storage.js.map