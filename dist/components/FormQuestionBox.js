"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormQuestionBox = void 0;
var m = require("mithril");
var Changeset_1 = require("../Changeset");
var FormField_1 = require("./FormField");
var QuestionInput_1 = require("./inputs/QuestionInput");
var FormSaver_1 = require("../FormSaver");
var PreviousValue_1 = require("./PreviousValue");
exports.FormQuestionBox = {
    oninit: function (vnode) {
        vnode.state.changeset = new Changeset_1.Changeset(vnode.attrs.formState.values());
        /*
        vnode.state.changeset.listen((id, value) => {
          vnode.attrs.formState.changeValue(id, value);
        });
        */
        vnode.state.formSaver =
            new FormSaver_1.FormSaver(vnode.attrs.formState, vnode.state.changeset);
    },
    view: function (_a) {
        var _b = _a.attrs, publishedForm = _b.publishedForm, formState = _b.formState, validationErrors = _b.validationErrors, hideIgnored = _b.hideIgnored, _c = _b.previousValues, previousValues = _c === void 0 ? {} : _c, _d = _a.state, changeset = _d.changeset, formSaver = _d.formSaver;
        var section = formState.findCurrentSection(publishedForm);
        var _e = formState.summary(section), validQuestions = _e.validQuestions, ignoredQuestions = _e.ignoredQuestions;
        changeset.validationErrors(validationErrors);
        return m(".margin-top-medium", section.questions().map(function (question) {
            if (formState.validateLocalisation(question)) {
                if (validQuestions.find(function (q) { return q.id() === question.id(); })) {
                    return [
                        m(FormField_1.FormField, {
                            name: "".concat(question.id()),
                            changeset: changeset,
                            label: question.label(),
                            input: QuestionInput_1.QuestionInput,
                            question: question,
                            formSaver: formSaver,
                        }),
                        previousValues &&
                            previousValues[question.namedID()] &&
                            m(PreviousValue_1.PreviousValue, { question: question, previousValues: previousValues, changeset: changeset })
                    ];
                }
                else if (!hideIgnored) {
                    return m(".form__field.form__field--ignored", question.label());
                }
            }
        }));
    },
};
//# sourceMappingURL=FormQuestionBox.js.map