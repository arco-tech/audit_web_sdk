export class PublicForm {
    constructor(data) {
        this._data = data;
    }
    data() {
        return this._data;
    }
    namedId() {
        return this._data.named_id;
    }
    color() {
        return this._data.colour_code;
    }
    description() {
        return this._data.description;
    }
    uiType() {
        return this._data.ui_type;
    }
    name() {
        return this._data.name;
    }
}
//# sourceMappingURL=PublicForm.js.map