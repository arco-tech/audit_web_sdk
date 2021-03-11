import {FormState} from "./FormState";
import {PublishedForm, PublishedFormData} from "./PublishedForm";
import {PreviousValues} from "./PublicFormSubmission"

interface Cache {
  publishedForm: PublishedForm | null;
  formState: FormState | null;
  previousValues: PreviousValues | null;
}

const cache: Cache = {
  publishedForm: null,
  formState: null,
  previousValues: null,
};

const publishedFormKey = "publishedForm";
const formStateKey = "formState";
const previousValuesKey = "previousValues";
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
  window.sessionStorage.setItem(formStateKey,
    state ? JSON.stringify(state.data()) : null);
}

export function savePreviousValues(values: PreviousValues) {
  cache.previousValues = values;
  window.sessionStorage.setItem(
    previousValuesKey, 
    values ? JSON.stringify(values) : null
  );
}

export function loadPreviousValues(): PreviousValues | null {
  if (cache.previousValues) {
    return cache.previousValues;
  } else {
    return cache.previousValues = JSON.parse(
      window.sessionStorage.getItem(previousValuesKey)
    );
  }
} 

export function saveAuthToken(token: string): void {
  window.sessionStorage.setItem(authTokenKey, token);
}

export function loadAuthToken(): string | null {
  return window.sessionStorage.getItem(authTokenKey);
}
