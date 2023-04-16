import { log } from "./Log.js";
export class Changeset {
    constructor(originals = {}) {
        this.originals = {};
        this.changes = {};
        this.responseError = null;
        this.fieldErrors = {};
        this.listeners = [];
        this.originals = originals || {};
    }
    // Values
    getValue(name) {
        if (this.changes.hasOwnProperty(name)) {
            return this.getChange(name);
        }
        else if (this.originals.hasOwnProperty(name)) {
            return this.getOriginal(name);
        }
        else {
            return null;
        }
    }
    getValues() {
        return { ...this.originals, ...this.changes };
    }
    // Originals
    setOriginals(originals) {
        this.originals = originals || {};
    }
    getOriginal(name) {
        if (this.originals.hasOwnProperty(name)) {
            return this.originals[name];
        }
        else {
            return null;
        }
    }
    getOriginals() {
        return this.originals;
    }
    // Changes
    change(name, value) {
        this.changes[name] = value;
        this.listeners.forEach((listener) => {
            try {
                listener(name, value);
            }
            catch (error) {
                log("error", error);
            }
        });
    }
    getChange(name) {
        if (this.changes.hasOwnProperty(name)) {
            return this.changes[name];
        }
        else {
            return null;
        }
    }
    getChanges() {
        return this.changes;
    }
    hasAnyChanges() {
        for (const name in this.changes) {
            if (this.hasChange(name)) {
                return true;
            }
        }
        return false;
    }
    hasChange(name) {
        const change = this.getChange(name);
        return (this.changes.hasOwnProperty(name) &&
            this.changes[name] !== this.getOriginal(name));
    }
    clearChanges() {
        this.changes = {};
    }
    // Field Errors
    setFieldErrors(fieldErrors) {
        this.fieldErrors = fieldErrors || {};
    }
    setFieldError(name, errors) {
        this.fieldErrors[name] = errors;
    }
    getFieldErrors() {
        return this.fieldErrors;
    }
    getFieldError(name) {
        return this.fieldErrors[name];
    }
    hasFieldError(name) {
        return this.getFieldError(name) ? true : false;
    }
    // Response Error
    setResponseError(error) {
        this.responseError = error;
    }
    getResponseError() {
        return this.responseError;
    }
    hasResponseError() {
        return this.getResponseError() ? true : false;
    }
    // Errors
    clearErrors() {
        this.setFieldErrors({});
        this.setResponseError(null);
    }
    // Handlers
    errorResponse(response) {
        if (typeof response === "object" && typeof response.response === "object") {
            response = response.response;
        }
        if (!response) {
            this.setResponseError("something went wrong");
        }
        else if (response.error_type === "changeset") {
            this.setFieldErrors(response.errors);
            this.setResponseError("please fix the errors below");
        }
        else if (response.errors && response.errors.detail) {
            this.setResponseError(response.errors.detail);
        }
        else {
            log("error", "unknown response error", response);
            this.setResponseError("something went wrong");
        }
    }
    validationErrors(errors) {
        this.setFieldErrors(errors);
        this.setResponseError("please fix the errors below");
    }
    // Listeners
    listen(listener) {
        this.listeners.push(listener);
    }
}
//# sourceMappingURL=Changeset.js.map