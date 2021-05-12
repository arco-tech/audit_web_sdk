"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PublishedFormGoesTo = /** @class */ (function () {
    function PublishedFormGoesTo(data) {
        this._data = data;
    }
    PublishedFormGoesTo.prototype.type = function () {
        return this._data.type;
    };
    PublishedFormGoesTo.prototype.id = function () {
        return this._data.id;
    };
    return PublishedFormGoesTo;
}());
exports.PublishedFormGoesTo = PublishedFormGoesTo;
var PublishedFormAction = /** @class */ (function () {
    function PublishedFormAction(data) {
        this._data = data;
    }
    PublishedFormAction.prototype.text = function () {
        return this._data.text;
    };
    PublishedFormAction.prototype.whenSelected = function () {
        return this._data.when_selected;
    };
    PublishedFormAction.prototype.markAsDone = function () {
        return this._data.mark_as_done;
    };
    return PublishedFormAction;
}());
exports.PublishedFormAction = PublishedFormAction;
var PublishedFormOption = /** @class */ (function () {
    function PublishedFormOption(data) {
        this._data = data;
    }
    PublishedFormOption.prototype.id = function () {
        return this._data.id;
    };
    PublishedFormOption.prototype.label = function () {
        return this._data.label;
    };
    PublishedFormOption.prototype.index = function () {
        return this._data.index;
    };
    PublishedFormOption.prototype.actions = function () {
        return this._data.actions.map(function (actionData) {
            return new PublishedFormAction(actionData);
        });
    };
    PublishedFormOption.prototype.goesTo = function () {
        return new PublishedFormGoesTo(this._data.goes_to);
    };
    return PublishedFormOption;
}());
exports.PublishedFormOption = PublishedFormOption;
var PublishedFormServiceType = /** @class */ (function () {
    function PublishedFormServiceType(data) {
        this._data = data;
    }
    PublishedFormServiceType.prototype.namedID = function () {
        return this._data.named_id;
    };
    PublishedFormServiceType.prototype.basnetRelatedNamedID = function () {
        return this._data.basnet_related_named_id;
    };
    PublishedFormServiceType.prototype.label = function () {
        return this._data.label;
    };
    return PublishedFormServiceType;
}());
exports.PublishedFormServiceType = PublishedFormServiceType;
var PublishedFormQuestionColumnSettings = /** @class */ (function () {
    function PublishedFormQuestionColumnSettings(data) {
        this._data = data;
    }
    PublishedFormQuestionColumnSettings.prototype.title = function () {
        return this._data.title;
    };
    PublishedFormQuestionColumnSettings.prototype.info = function () {
        return this._data.info;
    };
    PublishedFormQuestionColumnSettings.prototype.dataType = function () {
        return this._data.data_type;
    };
    return PublishedFormQuestionColumnSettings;
}());
exports.PublishedFormQuestionColumnSettings = PublishedFormQuestionColumnSettings;
var PublishedFormQuestionGridSettings = /** @class */ (function () {
    function PublishedFormQuestionGridSettings(data) {
        this._data = data;
    }
    PublishedFormQuestionGridSettings.prototype.rows = function () {
        return this._data.rows.map(function (rowData) {
            return new PublishedFormQuestionColumnSettings(rowData);
        });
    };
    PublishedFormQuestionGridSettings.prototype.columns = function () {
        return this._data.columns.map(function (columnData) {
            return new PublishedFormQuestionColumnSettings(columnData);
        });
    };
    return PublishedFormQuestionGridSettings;
}());
exports.PublishedFormQuestionGridSettings = PublishedFormQuestionGridSettings;
var PublishedFormQuestionTableSettings = /** @class */ (function () {
    function PublishedFormQuestionTableSettings(data) {
        this._data = data;
    }
    PublishedFormQuestionTableSettings.prototype.columns = function () {
        return this._data.columns.map(function (columnData) {
            return new PublishedFormQuestionColumnSettings(columnData);
        });
    };
    return PublishedFormQuestionTableSettings;
}());
exports.PublishedFormQuestionTableSettings = PublishedFormQuestionTableSettings;
var PublishedFormQuestionMetadata = /** @class */ (function () {
    function PublishedFormQuestionMetadata(data) {
        this._data = data;
    }
    PublishedFormQuestionMetadata.prototype.gridSettings = function () {
        return new PublishedFormQuestionGridSettings(this._data.grid_settings);
    };
    PublishedFormQuestionMetadata.prototype.tableSettings = function () {
        return new PublishedFormQuestionTableSettings(this._data.table_settings);
    };
    return PublishedFormQuestionMetadata;
}());
exports.PublishedFormQuestionMetadata = PublishedFormQuestionMetadata;
var PublishedFormQuestion = /** @class */ (function () {
    function PublishedFormQuestion(data) {
        this._data = data;
    }
    PublishedFormQuestion.prototype.id = function () {
        return this._data.id;
    };
    PublishedFormQuestion.prototype.type = function () {
        return this._data.type;
    };
    PublishedFormQuestion.prototype.label = function () {
        return this._data.label;
    };
    PublishedFormQuestion.prototype.index = function () {
        return this._data.index;
    };
    PublishedFormQuestion.prototype.namedID = function () {
        return this._data.named_id;
    };
    PublishedFormQuestion.prototype.note = function () {
        return this._data.note;
    };
    PublishedFormQuestion.prototype.info = function () {
        return this._data.info;
    };
    PublishedFormQuestion.prototype.localisation = function () {
        return this._data.localisation;
    };
    PublishedFormQuestion.prototype.goesTo = function () {
        return new PublishedFormGoesTo(this._data.goes_to);
    };
    PublishedFormQuestion.prototype.serviceType = function () {
        if (this._data.service_type) {
            return new PublishedFormServiceType(this._data.service_type);
        }
        else {
            return null;
        }
    };
    PublishedFormQuestion.prototype.metadata = function () {
        return new PublishedFormQuestionMetadata(this._data.metadata || {});
    };
    PublishedFormQuestion.prototype.options = function () {
        return this._data.options
            .map(function (data) { return new PublishedFormOption(data); })
            .sort(function (a, b) { return a.index() - b.index(); });
    };
    return PublishedFormQuestion;
}());
exports.PublishedFormQuestion = PublishedFormQuestion;
var PublishedFormSectionIcon = /** @class */ (function () {
    function PublishedFormSectionIcon(data) {
        this._data = data;
    }
    PublishedFormSectionIcon.prototype.namedID = function () {
        return this._data.named_id;
    };
    return PublishedFormSectionIcon;
}());
exports.PublishedFormSectionIcon = PublishedFormSectionIcon;
var PublishedFormSection = /** @class */ (function () {
    function PublishedFormSection(data) {
        this._data = data;
    }
    PublishedFormSection.prototype.id = function () {
        return this._data.id;
    };
    PublishedFormSection.prototype.index = function () {
        return this._data.index;
    };
    PublishedFormSection.prototype.name = function () {
        return this._data.name;
    };
    PublishedFormSection.prototype.namedID = function () {
        return this._data.named_id;
    };
    PublishedFormSection.prototype.group = function () {
        return this._data.group;
    };
    PublishedFormSection.prototype.summary = function () {
        return this._data.summary;
    };
    PublishedFormSection.prototype.icon = function () {
        if (this._data.icon) {
            return new PublishedFormSectionIcon(this._data.icon);
        }
        else {
            return null;
        }
    };
    PublishedFormSection.prototype.serviceType = function () {
        if (this._data.service_type) {
            return new PublishedFormServiceType(this._data.service_type);
        }
        else {
            return null;
        }
    };
    PublishedFormSection.prototype.iconURL = function (color) {
        var icon = (this.icon() ? this.icon().namedID() : "business").toLowerCase();
        return "/images/section-icons/" + icon + "-" + (color || "black") + ".svg";
    };
    PublishedFormSection.prototype.required = function () {
        return this._data.required || false;
    };
    PublishedFormSection.prototype.questions = function () {
        return (this._data.questions || [])
            .map(function (data) { return new PublishedFormQuestion(data); })
            .sort(function (a, b) { return a.index() - b.index(); });
    };
    return PublishedFormSection;
}());
exports.PublishedFormSection = PublishedFormSection;
var PublishedFormForm = /** @class */ (function () {
    function PublishedFormForm(data) {
        this._data = data;
    }
    PublishedFormForm.prototype.id = function () {
        return this._data.id;
    };
    PublishedFormForm.prototype.sections = function () {
        return this._data.sections
            .map(function (data) { return new PublishedFormSection(data); })
            .sort(function (a, b) { return a.index() - b.index(); });
    };
    return PublishedFormForm;
}());
exports.PublishedFormForm = PublishedFormForm;
var PublishedForm = /** @class */ (function () {
    function PublishedForm(data) {
        this._data = data;
    }
    PublishedForm.prototype.data = function () {
        return this._data;
    };
    PublishedForm.prototype.id = function () {
        return this._data.id;
    };
    PublishedForm.prototype.version = function () {
        return this._data.version;
    };
    PublishedForm.prototype.insertedAt = function () {
        return new Date(this._data.inserted_at + "Z");
    };
    PublishedForm.prototype.form = function () {
        return new PublishedFormForm(this._data.form);
    };
    PublishedForm.prototype.formTypeID = function () {
        return this._data.form_type_id;
    };
    return PublishedForm;
}());
exports.PublishedForm = PublishedForm;
//# sourceMappingURL=PublishedForm.js.map