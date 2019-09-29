"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var Changeset_1 = require("../Changeset");
var FormField_1 = require("./FormField");
var QuestionInput_1 = require("./inputs/QuestionInput");
exports.FormQuestionBox = {
    oninit: function (vnode) {
        vnode.state.changeset = new Changeset_1.Changeset(vnode.attrs.formState.values());
        vnode.state.changeset.listen(function (id, value) {
            vnode.attrs.formState.changeValue(id, value);
        });
    },
    view: function (_a) {
        var _b = _a.attrs, publishedForm = _b.publishedForm, formState = _b.formState, validationErrors = _b.validationErrors, changeset = _a.state.changeset;
        var section = formState.findCurrentSection(publishedForm);
        var _c = formState.summary(section), validQuestions = _c.validQuestions, ignoredQuestions = _c.ignoredQuestions;
        changeset.validationErrors(validationErrors);
        return m(".margin-top-medium", section.questions().map(function (question) {
            if (formState.validateLocalisation(question)) {
                if (validQuestions.find(function (q) { return q.id() === question.id(); })) {
                    return m(FormField_1.FormField, {
                        name: "" + question.id(),
                        changeset: changeset,
                        label: question.label(),
                        input: QuestionInput_1.QuestionInput,
                        question: question,
                    });
                }
                else {
                    return m(".form__field.form__field--ignored", question.label());
                }
            }
        }));
    },
};
//# sourceMappingURL=FormQuestionBox.js.map