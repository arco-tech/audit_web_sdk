import { FormState } from "./FormState.js";
import { PublishedForm } from "./PublishedForm.js";
import { PublicForm } from "./PublicForm.js";
const cache = {
    publicForm: null,
    publishedForm: null,
    formState: null,
    previousValues: null,
};
const publicFormKey = "publicForm";
const publishedFormKey = "publishedForm";
const formStateKey = "formState";
const previousValuesKey = "previousValues";
const authTokenKey = "authToken";
export function loadPublicForm() {
    if (cache.publicForm) {
        return cache.publicForm;
    }
    else {
        try {
            const data = JSON.parse(window.sessionStorage.getItem(publicFormKey));
            if (data.name) {
                cache.publicForm = new PublicForm(data);
                return cache.publicForm;
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
export function savePublicForm(publicForm) {
    cache.publicForm = publicForm;
    window.sessionStorage.setItem(publicFormKey, JSON.stringify(publicForm.data()));
}
export function loadPublishedForm() {
    if (cache.publishedForm) {
        return cache.publishedForm;
    }
    else {
        try {
            const data = JSON.parse(window.sessionStorage.getItem(publishedFormKey));
            if (data.id && data.form && Array.isArray(data.form.sections)) {
                cache.publishedForm = new PublishedForm(data);
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
export function savePublishedForm(publishedForm) {
    cache.publishedForm = publishedForm;
    window.sessionStorage.setItem(publishedFormKey, JSON.stringify(publishedForm.data()));
}
export function loadFormState() {
    if (cache.formState) {
        return cache.formState;
    }
    else {
        try {
            const stateData = JSON.parse(window.sessionStorage.getItem(formStateKey));
            if (stateData.values && stateData.details) {
                cache.formState = new FormState(stateData, saveFormState);
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
export function saveFormState(state) {
    cache.formState = state;
    window.sessionStorage.setItem(formStateKey, state ? JSON.stringify(state.data()) : null);
}
export function savePreviousValues(values) {
    cache.previousValues = values;
    window.sessionStorage.setItem(previousValuesKey, values ? JSON.stringify(values) : null);
}
export function loadPreviousValues() {
    if (cache.previousValues) {
        return cache.previousValues;
    }
    else {
        return cache.previousValues = JSON.parse(window.sessionStorage.getItem(previousValuesKey));
    }
}
export function saveAuthToken(token) {
    window.sessionStorage.setItem(authTokenKey, token);
}
export function loadAuthToken() {
    return window.sessionStorage.getItem(authTokenKey);
}
//# sourceMappingURL=Storage.js.map