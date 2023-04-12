"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLocalisation = exports.summary = void 0;
var Questions = require("./Questions");
function summary(section, location, values) {
    var validQuestions = [];
    var ignoredQuestions = [];
    var goesTo = null;
    section.questions().forEach(function (question) {
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
            goesTo = Questions.goesTo(question, values["".concat(question.id())]);
            validQuestions.push(question);
        }
    });
    return { validQuestions: validQuestions, ignoredQuestions: ignoredQuestions };
}
exports.summary = summary;
function validateLocalisation(question, location) {
    var localisation = question.localisation();
    return !location || !localisation ||
        !Array.isArray(localisation) || localisation.length === 0 ||
        localisation.indexOf(location.countryCode()) !== -1;
}
exports.validateLocalisation = validateLocalisation;
//# sourceMappingURL=FormLogic.js.map