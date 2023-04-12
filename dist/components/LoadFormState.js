"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadFormState = void 0;
var m = require("mithril");
var Storage = require("../Storage");
var PublishedForm_1 = require("../PublishedForm");
var FormState_1 = require("../FormState");
var PublicFormSubmission_1 = require("../PublicFormSubmission");
var Log_1 = require("../Log");
var PublicFormAPI = require("../api/public_forms/PublicFormAPI");
var PublicFormSubmissionAPI = require("../api/public_forms/PublicFormSubmissionAPI");
var Spinner_1 = require("../components/Spinner");
exports.LoadFormState = {
    oninit: function (vnode) {
        Promise.all([
            PublicFormAPI.current(),
            PublicFormSubmissionAPI.current(),
        ])
            .then(function (_a) {
            var publishedFormData = _a[0], publicFormSubmissionData = _a[1];
            var formStateData = (0, PublicFormSubmission_1.stateDataFromSubmissionData)(publicFormSubmissionData);
            var formState = new FormState_1.FormState(formStateData, Storage.saveFormState);
            formState.save();
            var publishedForm = new PublishedForm_1.PublishedForm(publishedFormData);
            Storage.savePublishedForm(publishedForm);
            vnode.attrs.onSuccess({ publishedForm: publishedForm, formState: formState });
        })
            .catch(function (error) {
            (0, Log_1.log)("error", error);
            vnode.state.errorMessage =
                "sorry, something went wrong while loading your form";
            if (vnode.attrs.onFailure) {
                vnode.attrs.onFailure(error);
            }
        });
    },
    view: function (vnode) {
        if (vnode.state.errorMessage) {
            return m("p.align-center", vnode.state.errorMessage);
        }
        else {
            return m(Spinner_1.Spinner);
        }
    },
};
//# sourceMappingURL=LoadFormState.js.map