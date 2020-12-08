export type PublishedFormQuestionType = (
  "text" |
  "paragraph" |
  "multi_text" |
  "number" |
  "percentage" |
  "button" |
  "multi_button" |
  "dropdown" |
  "date" |
  "date_range"
)

export type PublishedFormGoesToType = (
  "question" |
  "next_question" |
  "next_section"
)

export interface PublishedFormGoesToData {
  type: PublishedFormGoesToType
  id?: number
}

export interface PublishedFormActionData {
  text: string
  mark_as_done: boolean
  when_selected: boolean
}

export interface PublishedFormOptionData {
  id: number
  label: string
  index: number
  goes_to: PublishedFormGoesToData
  actions: []
}

export interface PublishedFormServiceTypeData {
  named_id: string
  basnet_related_named_id: string
  label: string
}

export interface PublishedFormQuestionData {
  id: number
  type: PublishedFormQuestionType
  index: number
  label: string
  named_id: string
  note: string | null
  info: string | null
  goes_to: PublishedFormGoesToData
  service_type: PublishedFormServiceTypeData | null
  localisation: string[] | null
  metadata?: PublishedFormQuestionMetadataData
  options: PublishedFormOptionData[]
}

export interface PublishedFormQuestionMetadataData {
  grid_settings?: PublishedFormQuestionGridSettingsData
  table_settings?: PublishedFormQuestionTableSettingsData
}

export interface PublishedFormQuestionGridSettingsData {
  rows: PublishedFormQuestionColumnSettingsData[]
  columns: PublishedFormQuestionColumnSettingsData[]
}

export interface PublishedFormQuestionTableSettingsData {
  columns: PublishedFormQuestionColumnSettingsData[]
}

export interface PublishedFormQuestionColumnSettingsData {
  title: string
  info: string
  data_type: null | "string" | "integer" | "float"
  sum: boolean
}

export interface PublishedFormSectionIconData {
  named_id: string
}

export interface PublishedFormSectionData {
  id: number
  index: number
  name: string
  summary: string
  named_id?: string
  group?: string
  icon: PublishedFormSectionIconData | null
  service_type: PublishedFormServiceTypeData | null
  required: boolean
  questions: PublishedFormQuestionData[]
}

export interface PublishedFormFormData {
  id: number
  sections: PublishedFormSectionData[]
}

export interface PublishedFormData {
  id: number
  version: string
  inserted_at: string
  form: PublishedFormFormData
  form_type_id: number
}

export class PublishedFormGoesTo {
  private _data: PublishedFormGoesToData

  constructor(data: PublishedFormGoesToData) {
    this._data = data
  }

  public type(): "question" | "next_question" | "next_section" {
    return this._data.type
  }

  public id(): number {
    return this._data.id
  }
}

export class PublishedFormAction {
  private _data: PublishedFormActionData

  constructor(data: PublishedFormActionData) {
    this._data = data
  }

  public text(): string {
    return this._data.text
  }

  public whenSelected(): boolean {
    return this._data.when_selected
  }

  public markAsDone(): boolean {
    return this._data.mark_as_done
  }
}

export class PublishedFormOption {
  private _data: PublishedFormOptionData

  constructor(data: PublishedFormOptionData) {
    this._data = data
  }

  public id(): number {
    return this._data.id
  }

  public label(): string {
    return this._data.label
  }

  public index(): number {
    return this._data.index
  }

  public actions(): PublishedFormAction[] {
    return this._data.actions.map((actionData) => {
      return new PublishedFormAction(actionData)
    })
  }

  public goesTo(): PublishedFormGoesTo {
    return new PublishedFormGoesTo(this._data.goes_to)
  }
}

export class PublishedFormServiceType {
  private _data: PublishedFormServiceTypeData

  constructor(data: PublishedFormServiceTypeData) {
    this._data = data
  }

  public namedID(): string {
    return this._data.named_id
  }

  public basnetRelatedNamedID(): string {
    return this._data.basnet_related_named_id
  }

  public label(): string {
    return this._data.label
  }
}

export class PublishedFormQuestionColumnSettings {
  private _data: PublishedFormQuestionColumnSettingsData

  constructor(data: PublishedFormQuestionColumnSettingsData) {
    this._data = data
  }

  public title(): string {
    return this._data.title
  }

  public info(): string {
    return this._data.info
  }

  public dataType(): string {
    return this._data.data_type
  }

  public sum(): boolean {
    return this._data.sum
  }
}

export class PublishedFormQuestionGridSettings {
  private _data: PublishedFormQuestionGridSettingsData

  constructor(data: PublishedFormQuestionGridSettingsData) {
    this._data = data
  }

  public rows(): PublishedFormQuestionColumnSettings[] {
    return this._data.rows.map((rowData) => {
      return new PublishedFormQuestionColumnSettings(rowData)
    })
  }

  public columns(): PublishedFormQuestionColumnSettings[] {
    return this._data.columns.map((columnData) => {
      return new PublishedFormQuestionColumnSettings(columnData)
    })
  }
}

export class PublishedFormQuestionTableSettings {
  private _data: PublishedFormQuestionTableSettingsData

  constructor(data: PublishedFormQuestionTableSettingsData) {
    this._data = data
  }

  public columns(): PublishedFormQuestionColumnSettings[] {
    return this._data.columns.map((columnData) => {
      return new PublishedFormQuestionColumnSettings(columnData)
    })
  }
}

export class PublishedFormQuestionMetadata {
  private _data: PublishedFormQuestionMetadataData

  constructor(data: PublishedFormQuestionMetadataData) {
    this._data = data
  }

  public gridSettings(): PublishedFormQuestionGridSettings | null {
    return new PublishedFormQuestionGridSettings(this._data.grid_settings)
  }

  public tableSettings(): PublishedFormQuestionTableSettings | null {
    return new PublishedFormQuestionTableSettings(this._data.table_settings)
  }
}

export class PublishedFormQuestion {
  private _data: PublishedFormQuestionData

  constructor(data: PublishedFormQuestionData) {
    this._data = data
  }

  public id(): number {
    return this._data.id
  }

  public type(): PublishedFormQuestionType {
    return this._data.type
  }

  public label(): string {
    return this._data.label
  }

  public index(): number {
    return this._data.index
  }

  public namedID(): string | null {
    return this._data.named_id
  }

  public note(): string | null {
    return this._data.note
  }

  public info(): string | null {
    return this._data.info
  }

  public localisation(): string[] | null {
    return this._data.localisation
  }

  public goesTo(): PublishedFormGoesTo {
    return new PublishedFormGoesTo(this._data.goes_to)
  }

  public serviceType(): PublishedFormServiceType | null {
    if (this._data.service_type) {
      return new PublishedFormServiceType(this._data.service_type)
    } else {
      return null
    }
  }

  public metadata(): PublishedFormQuestionMetadata {
    return new PublishedFormQuestionMetadata(this._data.metadata || {})
  }

  public options(): PublishedFormOption[] {
    return this._data.options
      .map((data: PublishedFormOptionData) => new PublishedFormOption(data))
      .sort((a, b) => a.index() - b.index())
  }
}

export class PublishedFormSectionIcon {
  private _data: PublishedFormSectionIconData

  constructor(data: PublishedFormSectionIconData) {
    this._data = data
  }

  public namedID(): string {
    return this._data.named_id
  }
}

export class PublishedFormSection {
  private _data: PublishedFormSectionData

  constructor(data: PublishedFormSectionData) {
    this._data = data
  }

  public id(): number {
    return this._data.id
  }

  public index(): number {
    return this._data.index
  }

  public name(): string {
    return this._data.name
  }

  public namedID(): string | null {
    return this._data.named_id
  }

  public group(): string | null {
    return this._data.group
  }

  public summary(): string {
    return this._data.summary
  }

  public icon(): PublishedFormSectionIcon | null {
    if (this._data.icon) {
      return new PublishedFormSectionIcon(this._data.icon)
    } else {
      return null
    }
  }

  public serviceType(): PublishedFormServiceType | null {
    if (this._data.service_type) {
      return new PublishedFormServiceType(this._data.service_type)
    } else {
      return null
    }
  }

  public iconURL(color?: "black" | "green"): string {
    const icon =
      (this.icon() ? this.icon().namedID() : "business").toLowerCase()
    return `/images/section-icons/${icon}-${color || "black"}.svg`
  }

  public required(): boolean {
    return this._data.required || false
  }

  public questions(): PublishedFormQuestion[] {
    return (this._data.questions || [])
      .map((data: PublishedFormQuestionData) => new PublishedFormQuestion(data))
      .sort((a, b) => a.index() - b.index())
  }
}

export class PublishedFormForm {
  private _data: PublishedFormFormData

  constructor(data: PublishedFormFormData) {
    this._data = data
  }

  public id(): number {
    return this._data.id
  }

  public sections(): PublishedFormSection[] {
    return this._data.sections
      .map((data: PublishedFormSectionData) => new PublishedFormSection(data))
      .sort((a, b) => a.index() - b.index())
  }
}

export class PublishedForm {
  private _data: PublishedFormData

  constructor(data: PublishedFormData) {
    this._data = data
  }

  public data(): PublishedFormData {
    return this._data
  }

  public id(): number {
    return this._data.id
  }

  public version(): string {
    return this._data.version
  }

  public insertedAt(): Date {
    return new Date(this._data.inserted_at + "Z")
  }

  public form(): PublishedFormForm {
    return new PublishedFormForm(this._data.form)
  }

  public formTypeID(): number {
    return this._data.form_type_id
  }
}
