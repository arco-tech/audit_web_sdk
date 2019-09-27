import {FormState} from "./FormState";
import {PublishedForm, PublishedFormData} from "./PublishedForm";

interface Cache {
  publishedForm: PublishedForm | null;
  formState: FormState | null;
}

const cache = {
  publishedForm: null,
  formState: null,
};

const publishedFormKey = "publishedForm";
const formStateKey = "formState";
const formSubmissionKey = "publicFormSubmission";
const authTokenKey = "authToken";

export function loadPublishedForm(): PublishedForm | null {
  if (cache.publishedForm) {
    return cache.publishedForm;
  } else {
    try {
      const data = JSON.parse(window.sessionStorage.getItem(publishedFormKey));
      if (data.id && data.form && Array.isArray(data.form.sections)) {
        cache.publishedForm = new PublishedForm(data);
        return cache.publishedForm;
      } else {
        throw new Error("invalid");
      }
    } catch (error) {
      return null;
    }
  }
}

export function savePublishedForm(publishedForm: PublishedForm): void {
  cache.publishedForm = publishedForm;
  window.sessionStorage.setItem(
    publishedFormKey,
    JSON.stringify(publishedForm.data()),
  );
}

export function loadFormState(): FormState | null {
  if (cache.formState) {
    return cache.formState;
  } else {
    try {
      const stateData = JSON.parse(window.sessionStorage.getItem(formStateKey));
      if (stateData.values && stateData.details) {
        cache.formState = new FormState(stateData, saveFormState);
        return cache.formState;
      } else {
        throw new Error("invalid");
      }
    } catch (error) {
      return null;
    }
  }
}

export function saveFormState(state: FormState) {
  cache.formState = state;
  window.sessionStorage.setItem(formStateKey, JSON.stringify(state.data()));
}

export function saveAuthToken(token: string): void {
  window.sessionStorage.setItem(authTokenKey, token);
}

export function loadAuthToken(): string | null {
  return window.sessionStorage.getItem(authTokenKey);
}
