import * as m from "mithril";
import {Changeset} from "../../Changeset";

interface Attrs {
  selector?: string;
  changeset: Changeset;
  name: string;
}

interface State {
  input: HTMLInputElement
}

export const FileUploadInput: m.Component<Attrs> = {
  view: ({ attrs: { selector, changeset, name }, state }) => {
    return m("input", {
      type: "file",
      multiple: true,
      value: changeset.getValue(name),
      oninput: (event) => {
        // changeset.change(name, event.target.value);
      },
    });
  },
};
