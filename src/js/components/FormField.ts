import * as m from "mithril";
import {Changeset} from "../Changeset";
import {ErrorMessage} from "./ErrorMessage";

interface Attrs {
  label?: string | m.Component<any>;
  name: string;
  changeset: Changeset;
  input: m.Component<{name: string, changeset: Changeset}>;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const FormField: m.Component<Attrs> = {
  view: ({attrs: {label, name, changeset, formSaver, input, ...attrs}}: Vnode) => {
    const saved = formSaver && !formSaver.valueDiff(question.id());
    const saving = formSaver && !saved && formSaver.isSaving();
    return m(".form__field", [
      formSaver && m(".form__field__label", [
        m("div", label),
        saved && m(".form__field__label__status", "Saved"),
        saving && m(".form__field__label__status", "Saving..."),
      ]),
      !formSaver && label && m(".form__field__label", label),
      m(input, {name, changeset, ...attrs}),
      m(ErrorMessage, {error: changeset.getFieldError(name)}),
    ]);
  },
};
