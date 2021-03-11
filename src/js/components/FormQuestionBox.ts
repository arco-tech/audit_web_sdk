import * as m from "mithril";
import {Changeset} from "../Changeset";
import {FormState} from "../FormState";
import {PublishedForm} from "../PublishedForm";
import {FormField} from "./FormField";
import {QuestionInput} from "./inputs/QuestionInput";
import {PreviousValues} from "../PublicFormSubmission"
import {PreviousValue} from "./PreviousValue"

interface Attrs {
  publishedForm: PublishedForm;
  formState: FormState;
  hideIgnored?: boolean;
  previousValues?: PreviousValues
}

type Vnode = m.Vnode<Attrs>;

export const FormQuestionBox: m.Component<Attrs> = {
  oninit: (vnode: Vnode) => {
    vnode.state.changeset = new Changeset(vnode.attrs.formState.values());
    vnode.state.changeset.listen((id, value) => {
      vnode.attrs.formState.changeValue(id, value);
    });
  },

  view: ({
    attrs: {
      publishedForm,
      formState,
      validationErrors,
      hideIgnored,
      previousValues = {},
    },
    state: { changeset },
  }: Vnode,
  ) => {
    const section = formState.findCurrentSection(publishedForm);
    const {validQuestions, ignoredQuestions} = formState.summary(section);
    changeset.validationErrors(validationErrors);
    return m(".margin-top-medium", section.questions().map((question) => {
      if (formState.validateLocalisation(question)) {
        if (validQuestions.find((q) => q.id() === question.id())) {
          return [
            m(
FormField, {
              name: `${question.id()}`,
              changeset,
              label: question.label(),
              input: QuestionInput,
              question,
            }),
            previousValues && 
              previousValues[question.namedID()] && 
              m(PreviousValue, {question, previousValues, changeset})
          ];
        } else if (!hideIgnored) {
          return m(".form__field.form__field--ignored", question.label());
        }
      }
    }));
  },
};
