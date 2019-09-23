import * as m from "mithril";
import {Changeset} from "../Changeset";
import {ErrorMessage} from "./ErrorMessage";

interface Attrs {
  label?: string;
  name: string;
  changeset: Changeset;
  input: m.Component<{name: string, changeset: Changeset}>;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const FormField: m.Component<Attrs> = {
  view: ({attrs: {label, name, changeset, input, ...attrs}}: Vnode) => {
    return m(".form__field", [
      label && m(".form__field__label", label),
      m(input, {name, changeset, ...attrs}),
      m(ErrorMessage, {error: changeset.getFieldError(name)}),
    ]);
  },
};
