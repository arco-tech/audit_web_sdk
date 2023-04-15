import * as m from "mithril";
import {Changeset} from "../../Changeset.js";
import {PublishedFormQuestion} from "../../PublishedForm.js";
import * as Questions from "../../Questions.js";

interface Attrs {
  name: string;
  changeset: Changeset;
  question: PublishedFormQuestion;
  [key: string]: any;
}

type Vnode = m.Vnode<Attrs>;

export const QuestionInput: m.Component<Attrs> = {
  view: ({attrs: {question, ...attrs}}: Vnode) => {
    return Questions.render(question, attrs);
  },
};
