import m from "mithril";
import {sentence} from "../Grammar.js";

interface Attrs {
  error: string | string[] | null | undefined;
}

type Vnode = m.Vnode<Attrs>;

export const ErrorMessage: m.Component<Attrs> = {
  view: ({attrs: {error}}: Vnode) => {
    if (error && typeof error === "string") {
      return m(".error-message", sentence(error));
    } else if (error && Array.isArray(error)) {
      return error.map((errorItem) => {
        if (errorItem) {
          return m(".error-message", sentence(errorItem));
        }
      });
    }
  },
};
