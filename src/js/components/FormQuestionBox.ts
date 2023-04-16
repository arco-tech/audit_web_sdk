import m from "mithril";
import { Changeset } from "../Changeset.js";
import { FormState } from "../FormState.js";
import { PublishedForm} from "../PublishedForm.js";
import { FormField } from "./FormField.js";
import { QuestionInput } from "./inputs/QuestionInput.js";
import { PreviousValues } from "../PublicFormSubmission.js"
import { FormSaver } from "../FormSaver.js";
import { PreviousValue } from "./PreviousValue.js"

interface Attrs {
  publishedForm: PublishedForm;
  formState: FormState;
  hideIgnored?: boolean;
  previousValues?: PreviousValues
  validationErrors: any
}

interface State {
  changeset: Changeset
  formSaver: FormSaver
}

type Vnode = m.Vnode<Attrs, State>;

export const FormQuestionBox: m.Component<Attrs> = {
  oninit: (vnode: Vnode) => {
    vnode.state.changeset = new Changeset(vnode.attrs.formState.values());
    /*
    vnode.state.changeset.listen((id, value) => {
      vnode.attrs.formState.changeValue(id, value);
    });
    */
    vnode.state.formSaver =
      new FormSaver(vnode.attrs.formState, vnode.state.changeset)
  },

  view: ({
    attrs: {
      publishedForm,
      formState,
      validationErrors,
      hideIgnored,
      previousValues = {},
    },
    state: {
      changeset,
      formSaver,
    },
  }: Vnode,
  ) => {
    const section = formState.findCurrentSection(publishedForm);
    const {validQuestions, ignoredQuestions} = formState.summary(section);
    changeset.validationErrors(validationErrors);
    return m(".margin-top-medium", section.questions().map((question) => {
      if (formState.validateLocalisation(question)) {
        if (validQuestions.find((q) => q.id() === question.id())) {
          return [
            m(FormField, {
              name: `${question.id()}`,
              changeset,
              label: question.label(),
              input: QuestionInput,
              question,
              formSaver,
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
