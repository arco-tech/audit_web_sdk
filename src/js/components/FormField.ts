import m from "mithril";
import {Changeset} from "../Changeset.js";
import {ErrorMessage} from "./ErrorMessage.js";
import { PublishedFormQuestion } from "../PublishedForm.js"

interface Attrs {
  label?: string | m.Component<any>;
  name: string;
  changeset: Changeset;
  input: m.Component<{name: string, changeset: Changeset}>;
  question: PublishedFormQuestion
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const FormField: m.Component<Attrs> = {
  view: ({
    attrs: { label, name, changeset, formSaver, input, question, ...attrs}
  }: Vnode) => {
    const saved = formSaver && !formSaver.valueDiff(question.id());
    const saving = formSaver && !saved && formSaver.isSaving();
    return m(".form__field", [
      formSaver && m(".form__field__label", [
        m("div", label as any),
        m(".form__field__label__status", [
          saved && "Saved",
          saving && "Saving...",
        ]),
      ]),
      !formSaver && label && m(".form__field__label", label as any),
      m(input, {name, changeset, ...attrs}),
      m(ErrorMessage, {error: changeset.getFieldError(name)}),
    ]);
  },
};
