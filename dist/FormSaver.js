import * as m from "mithril";
import * as PublicFormSubmissionAPI from "./api/public_forms/PublicFormSubmissionAPI.js";
import { Task } from "./Task.js";
import { log } from "./Log.js";
const loopFrequency = 1000;
const waitAfterChanges = 3000;
const waitAfterSave = 5000;
const waitAfterError = 5000;
export class FormSaver {
    constructor(formState, changeset) {
        this.formState = formState;
        this.changeset = changeset;
        this.lastSavedAt = new Date(0);
        this.lastChangedAt = new Date(0);
        this.lastErrorAt = new Date(0);
        this.saveTask = new Task(() => this.save(), { run: false });
        this.changeset.listen((name, value) => {
            this.formState.changeValues(this.changeset.getValues());
            this.lastChangedAt = new Date();
        });
        this.loop();
    }
    diff() {
        return Object.keys(this.changeset.getValues())
            .map((id) => this.valueDiff(id) ? parseInt(id) : null)
            .filter((id) => id);
    }
    valueDiff(id) {
        id = `${id}`;
        return JSON.stringify(this.changeset.getOriginal(id)) !==
            JSON.stringify(this.changeset.getValue(id));
    }
    loop() {
        setTimeout(() => {
            try {
                const now = new Date().getTime();
                if (this.lastChangedAt.getTime() < now - waitAfterChanges &&
                    this.lastSavedAt.getTime() < now - waitAfterSave &&
                    this.lastErrorAt.getTime() < now - waitAfterError &&
                    this.diff().length !== 0 &&
                    !this.saveTask.isWorking()) {
                    this.saveTask.run();
                }
            }
            catch (error) { }
            this.loop();
        }, loopFrequency);
    }
    save() {
        setTimeout(() => { m.redraw(); });
        this.formState.changeValues(this.changeset.getValues());
        return PublicFormSubmissionAPI.update(this.formState)
            .then((submission) => {
            this.formState.changeValues(submission.values);
            this.formState.save();
            this.changeset.setOriginals(submission.values);
        })
            .catch((error) => {
            this.lastErrorAt = new Date();
            log("error", ["failed to update submission", error]);
        });
    }
    isSaving() {
        return this.saveTask.isWorking();
    }
}
//# sourceMappingURL=FormSaver.js.map