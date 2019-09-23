export interface LocationJSON {
  id: number;
  name: string;
  country_code: string;
  basnet_related_id: number;
}

export class Location {
  private _data: LocationJSON;

  constructor(data: LocationJSON) {
    this._data = data;
  }

  public id(): number {
    return this._data.id;
  }

  public name(): string {
    return this._data.name;
  }

  public countryCode(): string {
    return this._data.country_code;
  }

  public basnetRelatedID(): number {
    return this._data.basnet_related_id;
  }
}
