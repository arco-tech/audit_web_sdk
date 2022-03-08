import * as m from "mithril";
import {Changeset} from "../Changeset";
import {ErrorMessage} from "./ErrorMessage";
import { PublishedFormQuestion } from "../PublishedForm"

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
        m("div", label),
        m(".form__field__label__status", [
          saved && "Saved",
          saving && "Saving...",
        ]),
      ]),
      !formSaver && label && m(".form__field__label", label),
      m(input, {name, changeset, question, ...attrs}),
      m(ErrorMessage, {error: changeset.getFieldError(name)}),
    ]);
  },
};
