import {Location} from "./Location";
import {
  PublishedForm,
  PublishedFormGoesTo,
  PublishedFormQuestion,
  PublishedFormSection,
} from "./PublishedForm";
import * as Questions from "./Questions";

export interface SectionSummary {
  validQuestions: PublishedFormQuestion[];
  ignoredQuestions: PublishedFormQuestion[];
}

export function summary(
  section: PublishedFormSection,
  location: Location | null,
  values: {[questionID: string]: any},
): SectionSummary {
  const validQuestions = [];
  const ignoredQuestions = [];

  let goesTo: PublishedFormGoesTo | null = null;

  section.questions().forEach((question) => {
    if (!validateLocalisation(question, location)) {
      if (goesTo.type() === "question" && goesTo.id() === question.id()) {
        goesTo = null
      }
      ignoredQuestions.push(question);
    } else if (
      goesTo && (
        goesTo.type() === "next_section" ||
        (goesTo.type() === "question" && goesTo.id() !== question.id())
      )
    ) {
      ignoredQuestions.push(question);
    } else {
      goesTo = Questions.goesTo(question, values[`${question.id()}`]);
      validQuestions.push(question);
    }
  });

  return {validQuestions, ignoredQuestions};
}

export function validateLocalisation(
  question: PublishedFormQuestion,
  location: Location | null,
): boolean {
  const localisation = question.localisation();
  return !location || !localisation ||
    !Array.isArray(localisation) || localisation.length === 0 ||
    localisation.indexOf(location.countryCode()) !== -1;
}
