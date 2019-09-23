import {FormState} from "./FormState";
import {PublishedForm, PublishedFormData} from "./PublishedForm";

const publishedFormKey = "publishedForm";
const formStateKey = "formState";
const formSubmissionKey = "publicFormSubmission";
const authTokenKey = "authToken";

export function loadPublishedForm(): PublishedForm | null {
  try {
    const data = JSON.parse(window.sessionStorage.getItem(publishedFormKey));
    if (data.id && data.form && Array.isArray(data.form.sections)) {
      return new PublishedForm(data);
    } else {
      throw new Error("invalid");
    }
  } catch (error) {
    return null;
  }
}

export function savePublishedForm(data: PublishedFormData): void {
  window.sessionStorage.setItem(publishedFormKey, JSON.stringify(data));
}

export function loadFormState(): FormState | null {
  try {
    const stateData = JSON.parse(window.sessionStorage.getItem(formStateKey));
    if (stateData.values && stateData.details) {
      return new FormState(stateData, saveFormState);
    } else {
      throw new Error("invalid");
    }
  } catch (error) {
    return null;
  }
}

export function saveFormState(state: FormState) {
  window.sessionStorage.setItem(formStateKey, JSON.stringify(state.data()));
}

export function initiateFormState(): FormState {
  return FormState.initiate(saveFormState);
}

export function saveAuthToken(token: string): void {
  window.sessionStorage.setItem(authTokenKey, token);
}

export function loadAuthToken(): string | null {
  return window.sessionStorage.getItem(authTokenKey);
}
