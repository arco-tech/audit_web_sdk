import * as m from "mithril";
import {Changeset} from "../../Changeset";
import {PublishedFormQuestion} from "../../PublishedForm";
import * as Questions from "../../Questions";

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
