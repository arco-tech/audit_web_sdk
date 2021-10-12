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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var ErrorMessage_1 = require("./ErrorMessage");
exports.FormField = {
    view: function (_a) {
        var _b = _a.attrs, label = _b.label, name = _b.name, changeset = _b.changeset, formSaver = _b.formSaver, input = _b.input, question = _b.question, attrs = __rest(_b, ["label", "name", "changeset", "formSaver", "input", "question"]);
        var saved = formSaver && !formSaver.valueDiff(question.id());
        var saving = formSaver && !saved && formSaver.isSaving();
        return m(".form__field", [
            formSaver && m(".form__field__label", [
                m("div", label),
                saved && m(".form__field__label__status", "Saved"),
                saving && m(".form__field__label__status", "Saving..."),
            ]),
            !formSaver && label && m(".form__field__label", label),
            m(input, __assign({ name: name, changeset: changeset, question: question }, attrs)),
            m(ErrorMessage_1.ErrorMessage, { error: changeset.getFieldError(name) }),
        ]);
    },
};
//# sourceMappingURL=FormField.js.map