export class PublishedFormGoesTo {
    constructor(data) {
        this._data = data;
    }
    type() {
        return this._data.type;
    }
    id() {
        return this._data.id;
    }
}
export class PublishedFormAction {
    constructor(data) {
        this._data = data;
    }
    text() {
        return this._data.text;
    }
    whenSelected() {
        return this._data.when_selected;
    }
    markAsDone() {
        return this._data.mark_as_done;
    }
}
export class PublishedFormOption {
    constructor(data) {
        this._data = data;
    }
    id() {
        return this._data.id;
    }
    label() {
        return this._data.label;
    }
    index() {
        return this._data.index;
    }
    actions() {
        return this._data.actions.map((actionData) => {
            return new PublishedFormAction(actionData);
        });
    }
    goesTo() {
        return new PublishedFormGoesTo(this._data.goes_to);
    }
}
export class PublishedFormServiceType {
    constructor(data) {
        this._data = data;
    }
    namedID() {
        return this._data.named_id;
    }
    basnetRelatedNamedID() {
        return this._data.basnet_related_named_id;
    }
    label() {
        return this._data.label;
    }
}
export class PublishedFormQuestionColumnSettings {
    constructor(data) {
        this._data = data;
    }
    title() {
        return this._data.title;
    }
    info() {
        return this._data.info;
    }
    dataType() {
        return this._data.data_type;
    }
}
export class PublishedFormQuestionGridSettings {
    constructor(data) {
        this._data = data;
    }
    rows() {
        return this._data.rows.map((rowData) => {
            return new PublishedFormQuestionColumnSettings(rowData);
        });
    }
    columns() {
        return this._data.columns.map((columnData) => {
            return new PublishedFormQuestionColumnSettings(columnData);
        });
    }
}
export class PublishedFormQuestionTableSettings {
    constructor(data) {
        this._data = data;
    }
    columns() {
        return this._data.columns.map((columnData) => {
            return new PublishedFormQuestionColumnSettings(columnData);
        });
    }
}
export class PublishedFormQuestionMetadata {
    constructor(data) {
        this._data = data;
    }
    gridSettings() {
        return new PublishedFormQuestionGridSettings(this._data.grid_settings);
    }
    tableSettings() {
        return new PublishedFormQuestionTableSettings(this._data.table_settings);
    }
}
export class PublishedFormQuestion {
    constructor(data) {
        this._data = data;
    }
    id() {
        return this._data.id;
    }
    type() {
        return this._data.type;
    }
    label() {
        return this._data.label;
    }
    index() {
        return this._data.index;
    }
    namedID() {
        return this._data.named_id;
    }
    note() {
        return this._data.note;
    }
    info() {
        return this._data.info;
    }
    localisation() {
        return this._data.localisation;
    }
    goesTo() {
        return new PublishedFormGoesTo(this._data.goes_to);
    }
    serviceType() {
        if (this._data.service_type) {
            return new PublishedFormServiceType(this._data.service_type);
        }
        else {
            return null;
        }
    }
    metadata() {
        return new PublishedFormQuestionMetadata(this._data.metadata || {});
    }
    options() {
        return this._data.options
            .map((data) => new PublishedFormOption(data))
            .sort((a, b) => a.index() - b.index());
    }
}
export class PublishedFormSectionIcon {
    constructor(data) {
        this._data = data;
    }
    namedID() {
        return this._data.named_id;
    }
}
export class PublishedFormSection {
    constructor(data) {
        this._data = data;
    }
    id() {
        return this._data.id;
    }
    index() {
        return this._data.index;
    }
    name() {
        return this._data.name;
    }
    namedID() {
        return this._data.named_id;
    }
    group() {
        return this._data.group;
    }
    summary() {
        return this._data.summary;
    }
    icon() {
        if (this._data.icon) {
            return new PublishedFormSectionIcon(this._data.icon);
        }
        else {
            return null;
        }
    }
    serviceType() {
        if (this._data.service_type) {
            return new PublishedFormServiceType(this._data.service_type);
        }
        else {
            return null;
        }
    }
    iconURL(color) {
        const icon = (this.icon() ? this.icon().namedID() : "business").toLowerCase();
        return `/images/section-icons/${icon}-${color || "black"}.svg`;
    }
    required() {
        return this._data.required || false;
    }
    questions() {
        return (this._data.questions || [])
            .map((data) => new PublishedFormQuestion(data))
            .sort((a, b) => a.index() - b.index());
    }
}
export class PublishedFormForm {
    constructor(data) {
        this._data = data;
    }
    id() {
        return this._data.id;
    }
    sections() {
        return this._data.sections
            .map((data) => new PublishedFormSection(data))
            .sort((a, b) => a.index() - b.index());
    }
}
export class PublishedForm {
    constructor(data) {
        this._data = data;
    }
    data() {
        return this._data;
    }
    id() {
        return this._data.id;
    }
    version() {
        return this._data.version;
    }
    insertedAt() {
        return new Date(this._data.inserted_at + "Z");
    }
    form() {
        return new PublishedFormForm(this._data.form);
    }
    questionByID(id) {
        return this.findQuestion((question) => question.id() === id);
    }
    questionByNamedID(namedID) {
        return this.findQuestion((question) => question.namedID() === namedID);
    }
    findQuestion(check) {
        this.form().sections().forEach((section) => {
            section.questions().forEach((question) => {
                if (check(question)) {
                    return question;
                }
            });
        });
        return null;
    }
    formTypeID() {
        return this._data.form_type_id;
    }
}
//# sourceMappingURL=PublishedForm.js.map