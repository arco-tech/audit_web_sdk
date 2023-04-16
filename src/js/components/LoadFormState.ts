import m from "mithril";

import * as Storage from "../Storage.js";
import {PublishedForm, PublishedFormData} from "../PublishedForm.js";
import {FormState} from "../FormState.js";
import {stateDataFromSubmissionData} from "../PublicFormSubmission.js";
import {log} from "../Log.js";

import * as PublicFormAPI from "../api/public_forms/PublicFormAPI.js";
import * as PublicFormSubmissionAPI from
  "../api/public_forms/PublicFormSubmissionAPI.js";

import {Spinner} from "../components/Spinner.js";

interface CallbackParam {
  formState: FormState;
  publishedForm: PublishedForm;
}

interface Attrs {
  onSuccess: (CallbackParam) => void;
  onFailure?: (error) => void;
}

interface State {
  errorMessage?: string;
}

type Vnode = m.Vnode<Attrs, State>;

export const LoadFormState: m.Component<Attrs> = {
  oninit: (vnode: Vnode) => {
    Promise.all([
      PublicFormAPI.current(),
      PublicFormSubmissionAPI.current(),
    ])
      .then(([publishedFormData, publicFormSubmissionData]) => {
        const formStateData =
          stateDataFromSubmissionData(publicFormSubmissionData);
        const formState = new FormState(formStateData, Storage.saveFormState);
        formState.save();
        const publishedForm = new PublishedForm(publishedFormData);
        Storage.savePublishedForm(publishedForm);
        vnode.attrs.onSuccess({publishedForm, formState});
      })
      .catch((error) => {
        log("error", error);
        vnode.state.errorMessage =
          "sorry, something went wrong while loading your form";
        if (vnode.attrs.onFailure) { vnode.attrs.onFailure(error); }
      });
  },

  view: (vnode: Vnode) => {
    if (vnode.state.errorMessage) {
      return m("p.align-center", vnode.state.errorMessage);
    } else {
      return m(Spinner);
    }
  },
};
