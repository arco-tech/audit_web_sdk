export interface PublicFormData {
  id: number
  named_id: string
  name: string
  form_type_id: number
  inserted_at: string
  updated_at: string
}

export class PublicForm {
  private _data: PublicFormData

  constructor(data: PublicFormData) {
    this._data = data
  }

  public data(): PublicFormData {
    return this._data
  }

  public id(): number {
    return this._data.id
  }

  public namedId(): string {
    return this._data.named_id
  }

  public name(): string {
    return this._data.name
  }

  public formTypeID(): number {
    return this._data.form_type_id
  }

  public insertedAt(): Date {
    return new Date(this._data.inserted_at + "Z")
  }

  public updatedAt(): Date {
    return new Date(this._data.updated_at + "Z")
  }
}