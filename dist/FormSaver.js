"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var PublicFormSubmissionAPI = require("./api/public_forms/PublicFormSubmissionAPI");
var Task_1 = require("./Task");
var Log_1 = require("./Log");
var loopFrequency = 1000;
var waitAfterChanges = 3000;
var waitAfterSave = 5000;
var waitAfterError = 5000;
var FormSaver = /** @class */ (function () {
    function FormSaver(formState, changeset) {
        var _this = this;
        this.formState = formState;
        this.changeset = changeset;
        this.lastSavedAt = new Date(0);
        this.lastChangedAt = new Date(0);
        this.lastErrorAt = new Date(0);
        this.saveTask = new Task_1.Task(function () { return _this.save(); }, { run: false });
        this.changeset.listen(function (name, value) {
            _this.formState.changeValues(_this.changeset.getValues());
            _this.lastChangedAt = new Date();
        });
        this.loop();
    }
    FormSaver.prototype.diff = function () {
        var _this = this;
        return Object.keys(this.changeset.getValues())
            .map(function (id) { return _this.valueDiff(id) ? parseInt(id) : null; })
            .filter(function (id) { return id; });
    };
    FormSaver.prototype.valueDiff = function (id) {
        id = "" + id;
        return JSON.stringify(this.changeset.getOriginal(id)) !==
            JSON.stringify(this.changeset.getValue(id));
    };
    FormSaver.prototype.loop = function () {
        var _this = this;
        setTimeout(function () {
            try {
                var now = new Date().getTime();
                if (_this.lastChangedAt.getTime() < now - waitAfterChanges &&
                    _this.lastSavedAt.getTime() < now - waitAfterSave &&
                    _this.lastErrorAt.getTime() < now - waitAfterError &&
                    _this.diff().length !== 0 &&
                    !_this.saveTask.isWorking()) {
                    _this.saveTask.run();
                }
            }
            catch (error) { }
            _this.loop();
        }, loopFrequency);
    };
    FormSaver.prototype.save = function () {
        var _this = this;
        setTimeout(function () { m.redraw(); });
        this.formState.changeValues(this.changeset.getValues());
        return PublicFormSubmissionAPI.update(this.formState)
            .then(function (submission) {
            _this.formState.changeValues(submission.values);
            _this.formState.save();
            _this.changeset.setOriginals(submission.values);
        })
            .catch(function (error) {
            _this.lastErrorAt = new Date();
            Log_1.log("error", ["failed to update submission", error]);
        });
    };
    FormSaver.prototype.isSaving = function () {
        return this.saveTask.isWorking();
    };
    return FormSaver;
}());
exports.FormSaver = FormSaver;
//# sourceMappingURL=FormSaver.js.map