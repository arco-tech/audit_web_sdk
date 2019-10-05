"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage = require("../Storage");
var PublishedForm_1 = require("../PublishedForm");
var FormState_1 = require("../FormState");
var Log_1 = require("../Log");
var PublicFormAPI_1 = require("../api/public_forms/PublicFormAPI");
var PublicFormSubmissionAPI_1 = require("../api/public_forms/PublicFormSubmissionAPI");
var Spinner_1 = require("../components/Spinner");
exports.LoadFormState = {
    oninit: function (vnode) {
        Promise.all([
            PublicFormAPI_1.PublicFormAPI.current(),
            PublicFormSubmissionAPI_1.PublicFormSubmissionAPI.current(),
        ])
            .then(function (publishedFormData, formStateData) {
            var formState = new FormState_1.FormState(formStateData, Storage.saveFormState);
            formState.save();
            var publishedForm = new PublishedForm_1.PublishedForm(publishedFormData);
            Storage.savePublishedForm(publishedForm);
            vnode.attrs.onSuccess({ publishedForm: publishedForm, formState: formState });
        })
            .catch(function (error) {
            Log_1.log("error", error);
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