"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("./Log");
var Changeset = /** @class */ (function () {
    function Changeset(originals) {
        if (originals === void 0) { originals = {}; }
        this.originals = {};
        this.changes = {};
        this.responseError = null;
        this.fieldErrors = {};
        this.listeners = [];
        this.originals = originals || {};
    }
    // Values
    Changeset.prototype.getValue = function (name) {
        if (this.changes.hasOwnProperty(name)) {
            return this.getChange(name);
        }
        else if (this.originals.hasOwnProperty(name)) {
            return this.getOriginal(name);
        }
        else {
            return null;
        }
    };
    Changeset.prototype.getValues = function () {
        return __assign(__assign({}, this.originals), this.changes);
    };
    // Originals
    Changeset.prototype.setOriginals = function (originals) {
        this.originals = originals || {};
    };
    Changeset.prototype.getOriginal = function (name) {
        if (this.originals.hasOwnProperty(name)) {
            return this.originals[name];
        }
        else {
            return null;
        }
    };
    Changeset.prototype.getOriginals = function () {
        return this.originals;
    };
    // Changes
    Changeset.prototype.change = function (name, value) {
        this.changes[name] = value;
        this.listeners.forEach(function (listener) {
            try {
                listener(name, value);
            }
            catch (error) {
                Log_1.log("error", error);
            }
        });
    };
    Changeset.prototype.getChange = function (name) {
        if (this.changes.hasOwnProperty(name)) {
            return this.changes[name];
        }
        else {
            return null;
        }
    };
    Changeset.prototype.getChanges = function () {
        return this.changes;
    };
    Changeset.prototype.hasAnyChanges = function () {
        for (var name_1 in this.changes) {
            if (this.hasChange(name_1)) {
                return true;
            }
        }
        return false;
    };
    Changeset.prototype.hasChange = function (name) {
        var change = this.getChange(name);
        return (this.changes.hasOwnProperty(name) &&
            this.changes[name] !== this.getOriginal(name));
    };
    Changeset.prototype.clearChanges = function () {
        this.changes = {};
    };
    // Field Errors
    Changeset.prototype.setFieldErrors = function (fieldErrors) {
        this.fieldErrors = fieldErrors || {};
    };
    Changeset.prototype.setFieldError = function (name, errors) {
        this.fieldErrors[name] = errors;
    };
    Changeset.prototype.getFieldError = function (name) {
        return this.fieldErrors[name];
    };
    Changeset.prototype.hasFieldError = function (name) {
        return this.getFieldError(name) ? true : false;
    };
    // Response Error
    Changeset.prototype.setResponseError = function (error) {
        this.responseError = error;
    };
    Changeset.prototype.getResponseError = function () {
        return this.responseError;
    };
    Changeset.prototype.hasResponseError = function () {
        return this.getResponseError() ? true : false;
    };
    // Errors
    Changeset.prototype.clearErrors = function () {
        this.setFieldErrors({});
        this.setResponseError(null);
    };
    // Handlers
    Changeset.prototype.errorResponse = function (response) {
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
            Log_1.log("error", "unknown response error", response);
            this.setResponseError("something went wrong");
        }
    };
    Changeset.prototype.validationErrors = function (errors) {
        this.setFieldErrors(errors);
        this.setResponseError("please fix the errors below");
    };
    // Listeners
    Changeset.prototype.listen = function (listener) {
        this.listeners.push(listener);
    };
    return Changeset;
}());
exports.Changeset = Changeset;
//# sourceMappingURL=Changeset.js.map