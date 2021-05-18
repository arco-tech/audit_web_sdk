export interface PublicFormData {
  named_id: string
  name: string
  colour_code: string
  description: string
  ui_type: string
}

export class PublicForm {
  private _data: PublicFormData

  constructor(data: PublicFormData) {
    this._data = data
  }

  public data(): PublicFormData {
    return this._data
  }

  public namedId(): string {
    return this._data.named_id
  }

  public color(): string {
    return this._data.colour_code
  }

  public description(): string {
    return this._data.description
  }

  public uiType(): string {
    return this._data.ui_type
  }

  public name(): string {
    return this._data.name
  }
}
