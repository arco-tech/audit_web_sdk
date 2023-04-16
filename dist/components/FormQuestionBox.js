import m from "mithril";
import { Changeset } from "../Changeset.js";
import { FormField } from "./FormField.js";
import { QuestionInput } from "./inputs/QuestionInput.js";
import { FormSaver } from "../FormSaver.js";
import { PreviousValue } from "./PreviousValue.js";
export const FormQuestionBox = {
    oninit: (vnode) => {
        vnode.state.changeset = new Changeset(vnode.attrs.formState.values());
        /*
        vnode.state.changeset.listen((id, value) => {
          vnode.attrs.formState.changeValue(id, value);
        });
        */
        vnode.state.formSaver =
            new FormSaver(vnode.attrs.formState, vnode.state.changeset);
    },
    view: ({ attrs: { publishedForm, formState, validationErrors, hideIgnored, previousValues = {}, }, state: { changeset, formSaver, }, }) => {
        const section = formState.findCurrentSection(publishedForm);
        const { validQuestions, ignoredQuestions } = formState.summary(section);
        changeset.validationErrors(validationErrors);
        return m(".margin-top-medium", section.questions().map((question) => {
            if (formState.validateLocalisation(question)) {
                if (validQuestions.find((q) => q.id() === question.id())) {
                    return [
                        m(FormField, {
                            name: `${question.id()}`,
                            changeset,
                            label: question.label(),
                            input: QuestionInput,
                            question,
                            formSaver,
                        }),
                        previousValues &&
                            previousValues[question.namedID()] &&
                            m(PreviousValue, { question, previousValues, changeset })
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