export interface IndustryData {
  id: number;
  named_id: string;
  name: string;
}

export class Industry {
  private _data: IndustryData;

  constructor(data: IndustryData) {
    this._data = data;
  }

  public id(): number {
    return this._data.id;
  }

  public namedID(): string {
    return this._data.named_id;
  }

  public name(): string {
    return this._data.name;
  }
}
