import * as m from "mithril";

import * as Storage from "../Storage";
import {PublishedForm, PublishedFormData} from "../PublishedForm";
import {FormState} from "../FormState";
import {stateDataFromSubmissionData} from "../PublicFormSubmission";
import {log} from "../Log";

import * as PublicFormAPI from "../api/public_forms/PublicFormAPI";
import * as PublicFormSubmissionAPI from
  "../api/public_forms/PublicFormSubmissionAPI";

import {Spinner} from "../components/Spinner";

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

type Vnode = m.Vnode<Attrs>;

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
