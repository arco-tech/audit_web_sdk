"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var Spinner_1 = require("./Spinner");
exports.TaskDisplay = {
    view: function (vnode) {
        var _a = vnode.attrs, task = _a.task, render = _a.render, renderError = _a.renderError, renderWorking = _a.renderWorking;
        switch (getStatus(task)) {
            case "working":
                return renderWorking ? renderWorking(task) : m(Spinner_1.Spinner);
            case "error":
                return renderError ? renderError(getError(task), task) :
                    "Sorry, something went wrong.";
            case "done":
                return render(getResult(task), task);
        }
    },
};
function getStatus(taskOrTasks) {
    if (Array.isArray(taskOrTasks)) {
        var statuses = taskOrTasks.map(function (task) { return task.getStatus(); });
        if (statuses.indexOf("error") !== -1)
            return "error";
        if (statuses.indexOf("working") !== -1)
            return "working";
        return "done";
    }
    else {
        return taskOrTasks.getStatus();
    }
}
function getError(taskOrTasks) {
    if (Array.isArray(taskOrTasks)) {
        return taskOrTasks
            .map(function (task) { return task.getError(); })
            .filter(function (error) { return error; });
    }
    else {
        return taskOrTasks.getError();
    }
}
function getResult(taskOrTasks) {
    if (Array.isArray(taskOrTasks)) {
        return taskOrTasks.map(function (task) { return task.getResult(); });
    }
    else {
        return taskOrTasks.getResult();
    }
}
//# sourceMappingURL=TaskDisplay.js.map