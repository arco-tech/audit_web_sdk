import m from "mithril";
import * as Storage from "../Storage.js";
import { PublishedForm } from "../PublishedForm.js";
import { FormState } from "../FormState.js";
import { stateDataFromSubmissionData } from "../PublicFormSubmission.js";
import { log } from "../Log.js";
import * as PublicFormAPI from "../api/public_forms/PublicFormAPI.js";
import * as PublicFormSubmissionAPI from "../api/public_forms/PublicFormSubmissionAPI.js";
import { Spinner } from "../components/Spinner.js";
export const LoadFormState = {
    oninit: (vnode) => {
        Promise.all([
            PublicFormAPI.current(),
            PublicFormSubmissionAPI.current(),
        ])
            .then(([publishedFormData, publicFormSubmissionData]) => {
            const formStateData = stateDataFromSubmissionData(publicFormSubmissionData);
            const formState = new FormState(formStateData, Storage.saveFormState);
            formState.save();
            const publishedForm = new PublishedForm(publishedFormData);
            Storage.savePublishedForm(publishedForm);
            vnode.attrs.onSuccess({ publishedForm, formState });
        })
            .catch((error) => {
            log("error", error);
            vnode.state.errorMessage =
                "sorry, something went wrong while loading your form";
            if (vnode.attrs.onFailure) {
                vnode.attrs.onFailure(error);
            }
        });
    },
    view: (vnode) => {
        if (vnode.state.errorMessage) {
            return m("p.align-center", vnode.state.errorMessage);
        }
        else {
            return m(Spinner);
        }
    },
};
//# sourceMappingURL=LoadFormState.js.map