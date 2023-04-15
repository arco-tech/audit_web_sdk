import * as m from "mithril";
import { ErrorMessage } from "./ErrorMessage.js";
export const FormField = {
    view: ({ attrs: { label, name, changeset, formSaver, input, question, ...attrs } }) => {
        const saved = formSaver && !formSaver.valueDiff(question.id());
        const saving = formSaver && !saved && formSaver.isSaving();
        return m(".form__field", [
            formSaver && m(".form__field__label", [
                m("div", label),
                m(".form__field__label__status", [
                    saved && "Saved",
                    saving && "Saving...",
                ]),
            ]),
            !formSaver && label && m(".form__field__label", label),
            m(input, { name, changeset, question, ...attrs }),
            m(ErrorMessage, { error: changeset.getFieldError(name) }),
        ]);
    },
};
//# sourceMappingURL=FormField.js.map