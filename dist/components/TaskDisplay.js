import m from "mithril";
import { Spinner } from "./Spinner.js";
export const TaskDisplay = {
    view: (vnode) => {
        const { attrs: { task, render, renderError, renderWorking } } = vnode;
        switch (getStatus(task)) {
            case "working":
                return renderWorking ? renderWorking(task) : m(Spinner);
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
        const statuses = taskOrTasks.map((task) => task.getStatus());
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
            .map((task) => task.getError())
            .filter((error) => error);
    }
    else {
        return taskOrTasks.getError();
    }
}
function getResult(taskOrTasks) {
    if (Array.isArray(taskOrTasks)) {
        return taskOrTasks.map((task) => task.getResult());
    }
    else {
        return taskOrTasks.getResult();
    }
}
//# sourceMappingURL=TaskDisplay.js.map