export interface FormTypeJSON {
  named_id: string;
  name: string;
  description: string;
}

export class FormType {
  private _data: FormTypeJSON;

  constructor(data: FormTypeJSON) {
    this._data = data;
  }

  public named_id(): string {
    return this._data.named_id;
  }

  public name(): string {
    return this._data.name;
  }

  public description(): string {
    return this._data.description;
  }
}
