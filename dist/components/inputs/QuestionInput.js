import * as Questions from "../../Questions.js";
export const QuestionInput = {
    view: ({ attrs: { question, ...attrs } }) => {
        return Questions.render(question, attrs);
    },
};
//# sourceMappingURL=QuestionInput.js.map