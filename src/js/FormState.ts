import * as FormLogic from "./FormLogic";
import {Location} from "./Location";
import * as Locations from "./Locations";
import {
  PublishedForm,
  PublishedFormQuestion,
  PublishedFormSection,
} from "./PublishedForm";
import * as Questions from "./Questions";
import {validate, ValidationResult} from "./Validation";

export interface FormStateValues {
  [questionID: string]: any;
}

export interface FormStateDetails {
  email: string;
  first_name: string;
  last_name: string;
  gender: string | null;
  company_name: string;
  location_id: number | null;
  industry_id: number | null;
  number_of_employees: number;
  accepted_terms_and_conditions: boolean;
  sent_help_request: boolean;
}

export interface FormStateData {
  currentSectionID: number | null;
  values: FormStateValues;
  details: FormStateDetails;
  filteredSectionIDs: number[];
  isComplete: boolean;
  hasSubmitted: boolean;
  metadata: {[key: string]: any};
}

export type FormStateSaver = (state: FormState) => void;

const storageID = "formState";

export class FormState {
  public static initiate(saver: FormStateSaver) {
    const stateData: FormStateData = {
      currentSectionID: null,
      values: {},
      filteredSectionIDs: [],
      isComplete: false,
      hasSubmitted: false,
      metadata: {},
      details: {
        email: "",
        first_name: "",
        last_name: "",
        gender: null,
        company_name: "",
        location_id: null,
        industry_id: null,
        sent_help_request: false,
        number_of_employees: null,
        accepted_terms_and_conditions: false,
      },
    };
    return new FormState(stateData, saver);
  }
  private _data: FormStateData;
  private _saver: FormStateSaver;

  constructor(data: FormStateData, saver: FormStateSaver) {
    this._data = data;
    this._saver = saver;
  }

  public currentSectionID(): number | null {
    return this._data.currentSectionID;
  }

  public value(questionID: number | string): any {
    return this._data.values[`${questionID}`];
  }

  public detail(name: keyof FormStateDetails): any {
    return this.details()[name];
  }

  public metadata(): {[key: string]: any} {
    return this._data.metadata;
  }

  public getMetadata(key: string): any {
    return this._data.metadata[key];
  }

  public putMetadata(key: string, value: any): void {
    this._data.metadata[key] = value;
  }

  public filterSections(
    sections: PublishedFormSection[],
  ): PublishedFormSection[] {
    return sections.filter((section: PublishedFormSection) => {
      return (
        section.required() ||
        this._data.filteredSectionIDs.indexOf(section.id()) !== -1
      );
    });
  }

  public isExcludedSection(section: PublishedFormSection): boolean {
    return this._data.filteredSectionIDs.indexOf(section.id()) === -1;
  }

  public excludedSections(
    sections: PublishedFormSection[],
  ): PublishedFormSection[] {
    return sections.filter((section: PublishedFormSection) => {
      return this._data.filteredSectionIDs.indexOf(section.id()) === -1;
    });
  }

  public currentSectionIndex(publishedForm: PublishedForm): number {
    const currentSection = this.findCurrentSection(publishedForm);
    const filteredSections =
      this.filterSections(publishedForm.form().sections());
    return filteredSections.findIndex((section) => {
      return section.id() === currentSection.id();
    });
  }

  public previousSection(publishedForm: PublishedForm): void {
    const current = this.currentSectionIndex(publishedForm);
    const sections = this.filterSections(publishedForm.form().sections());
    if (sections[current - 1]) {
      this.changeCurrentSectionID(sections[current - 1].id());
    }
  }

  public nextSection(publishedForm: PublishedForm): void {
    const current = this.currentSectionIndex(publishedForm);
    const sections = this.filterSections(publishedForm.form().sections());
    if (sections[current + 1]) {
      this.changeCurrentSectionID(sections[current + 1].id());
    }
  }

  public changeCurrentSectionID(sectionID: number): void {
    this._data.currentSectionID = sectionID;
    this._data.isComplete = false;
    this.save();
  }

  public changeValue(questionID: number | string, value: any): void {
    this._data.values[`${questionID}`] = value;
    this.save();
  }

  public changeValues(values: FormStateValues): void {
    if (typeof values === "object") {
      this._data.values = values;
    } else {
      throw new Error("values must be an object");
    }
  }

  public changeDetail(name: string, value: any) {
    this._data.details[name] = value;
    this.save();
  }

  public changeDetails(details: {[key: string]: any}) {
    this._data.details = {...this._data.details, ...details};
    this.save();
  }

  public changeFilteredSectionIDs(filteredSectionIDs: number[]): void {
    this._data.filteredSectionIDs = filteredSectionIDs;
    this.save();
  }

  public addFilteredSection(section: PublishedFormSection): void {
    if (this._data.filteredSectionIDs.indexOf(section.id()) === -1) {
      this._data.filteredSectionIDs.push(section.id());
    }
  }

  public changeIsComplete(isComplete: boolean): void {
    this._data.isComplete = isComplete;
    this.save();
  }

  public changeHasSubmitted(hasSubmitted: boolean): void {
    this._data.hasSubmitted = hasSubmitted;
    this.save();
  }

  public save() {
    this._saver(this);
  }

  public findCurrentSection(
    publishedForm: PublishedForm,
  ): PublishedFormSection {
    const sections = this.filterSections(publishedForm.form().sections());
    const currentID = this.currentSectionID();
    return sections.find((section) => {
      return section.id() === currentID;
    }) || sections[0];
  }

  public sectionProgress(section: PublishedFormSection): number {
    const {validQuestions} = this.summary(section);
    const statuses =
      validQuestions
      .filter((question) => question.type() !== "multi_button")
      .map((question) => {
        return Questions.isComplete(question, this.value(question.id()));
      });
    const completed = statuses.filter((complete) => complete);
    return (completed.length / statuses.length) * 100;
  }

  public summary(section: PublishedFormSection): FormLogic.SectionSummary {
    return FormLogic.summary(section, this.location(), this.values());
  }

  public validate(section: PublishedFormSection): ValidationResult {
    const constraints = {};
    const {validQuestions} = this.summary(section);
    validQuestions
      .filter((question) => this.validateLocalisation(question))
      .forEach((question) => {
        constraints[question.id()] = {
          custom: (value) => {
            if (Questions.isComplete(question, value)) {
              return [];
            } else {
              return ["This field is required"];
            }
          },
        };
      });
    return validate(constraints, this.values());
  }

  public validateLocalisation(question: PublishedFormQuestion): boolean {
    const localisation = question.localisation();
    if (localisation && localisation.length > 0) {
      const location = this.location();
      return location && localisation.indexOf(location.countryCode()) !== -1;
    } else {
      return true;
    }
  }

  public details(): FormStateDetails {
    return this._data.details;
  }

  public values(): FormStateValues {
    return {...this._data.values};
  }

  public filteredSectionIDs(): number[] {
    return this._data.filteredSectionIDs;
  }

  public isComplete(): boolean {
    return this._data.isComplete;
  }

  public hasSubmitted(): boolean {
    return this._data.hasSubmitted;
  }

  public location(): Location | null {
    return Locations.location(this._data.details.location_id);
  }

  public data(): FormStateData {
    return this._data;
  }

  public fullName(): string {
    return [this.detail("first_name"), this.detail("last_name")]
      .map((name: string | null) => (name || "").trim())
      .filter((name: string) => name)
      .join(" ");
  }
}
