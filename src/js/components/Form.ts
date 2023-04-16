import m from "mithril";
import {Changeset} from "../Changeset.js";
import {ErrorMessage} from "./ErrorMessage.js";

interface Attrs {
  changeset: Changeset;
  onSubmit?: (changeset: Changeset) => void;
}

type Vnode = m.Vnode<Attrs>;

export const Form: m.Component<Attrs> = {
  view: ({attrs: {changeset, onSubmit}, children}: Vnode) => {
    return m("form", {
      onsubmit: (event: Event) => {
        event.preventDefault();
        if (onSubmit) { onSubmit(changeset); }
      },
    }, [
      changeset.getResponseError && m(".margin-bottom-medium", [
        m(ErrorMessage, {error: changeset.getResponseError()}),
      ]),
      children,
      m("input.hide", {name: "submit", type: "submit"}),
    ]);
  },
};
