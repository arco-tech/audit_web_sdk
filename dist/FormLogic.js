import * as Questions from "./Questions.js";
export function summary(section, location, values) {
    const validQuestions = [];
    const ignoredQuestions = [];
    let goesTo = null;
    section.questions().forEach((question) => {
        if (!validateLocalisation(question, location)) {
            if (goesTo &&
                goesTo.type() === "question" &&
                goesTo.id() === question.id()) {
                goesTo = null;
            }
            ignoredQuestions.push(question);
        }
        else if (goesTo && (goesTo.type() === "next_section" ||
            (goesTo.type() === "question" && goesTo.id() !== question.id()))) {
            ignoredQuestions.push(question);
        }
        else {
            goesTo = Questions.goesTo(question, values[`${question.id()}`]);
            validQuestions.push(question);
        }
    });
    return { validQuestions, ignoredQuestions };
}
export function validateLocalisation(question, location) {
    const localisation = question.localisation();
    return !location || !localisation ||
        !Array.isArray(localisation) || localisation.length === 0 ||
        localisation.indexOf(location.countryCode()) !== -1;
}
//# sourceMappingURL=FormLogic.js.map