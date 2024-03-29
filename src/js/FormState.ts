import * as FormLogic from "./FormLogic.js";
import {Location} from "./Location.js";
import * as Locations from "./Locations.js";
import {
  PublishedForm,
  PublishedFormQuestion,
  PublishedFormSection,
} from "./PublishedForm.js";
import * as Questions from "./Questions.js";
import {validate, ValidationResult} from "./Validation.js";

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
  trashed: boolean;
  metadata: {[key: string]: any};
  migratePublishedFormID?: number | null;
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
      trashed: false,
      migratePublishedFormID: null,
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
    return this._data.metadata || {};
  }

  public getMetadata(key: string): any {
    return this._data.metadata[key];
  }

  public putMetadata(key: string, value: any): void {
    this._data.metadata[key] = value;
    this.save();
  }

  public filterSections(
    sections: PublishedFormSection[],
  ): PublishedFormSection[] {
    const filtered = sections.filter((section: PublishedFormSection) => {
      return (
        this._data.filteredSectionIDs.indexOf(section.id()) !== -1
      );
    });
    return filtered.length === 0 ? sections : filtered
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

  public sectionsProgress(
    sections: PublishedFormSection[],
    ignoreQuestions: string[] = [],
  ): number {
    let total = 0;
    let complete = 0;
    sections.forEach((section) => {
      const {validQuestions} = this.summary(section);
      validQuestions.forEach((question) => {
        if (
          question.type() !== "multi_button" &&
          ignoreQuestions.indexOf(question.namedID()) === -1
        ) {
          total += 1;
          if (Questions.isComplete(question, this.value(question.id()))) {
            complete += 1;
          }
        }
      });
    });

    if (total === 0 && complete === 0) {
      return 0;
    } else {
      return (complete / total) * 100;
    }
  }

  public sectionProgress(
    section: PublishedFormSection,
    ignoreQuestions: string[] = [],
  ): number {
    return this.sectionsProgress(section ? [section] : [], ignoreQuestions);
  }

  public summary(
    section: PublishedFormSection,
    values?: {[questionID: string]: any},
  ): FormLogic.SectionSummary {
    return FormLogic.summary(section, this.location(), values || this.values());
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

  // for a given question, determine if it is in a visible fieldset
  public hasVisibleFieldset(question: PublishedFormQuestion, visible: string[]): boolean {
    const fs = question.fieldset();
    // the default (empty/nil) fieldset is always visible
    if(fs == null || fs == ""){
      return true;
    }
    // otherwise must be in the list of visible fieldsets!
    return visible.includes(fs);
  }

  // given a form, figure out which fieldsets should be visible
  public findVisibleFieldsets(form: PublishedForm): string[] {
    let fieldsets = [];
    // get the selected options of the questions
    const controllers = form.fieldsetControllers();
    for(const c of controllers) {
      const selected = this.value(c.question);
      if(!selected) {
        continue;
      }
      if(selected.includes(c.option)) {
        fieldsets.push(c.fieldset);
      }
    }

    return fieldsets;
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

  public isTrashed(): boolean {
    return this._data.trashed;
  }

  public location(): Location | null {
    return Locations.location(this._data.details.location_id);
  }

  public migratePublishedFormID(): number | null {
    return this._data.migratePublishedFormID;
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
