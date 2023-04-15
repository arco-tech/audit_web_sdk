import * as m from "mithril";
import {Spinner} from "./Spinner.js";
import {Task} from "../Task.js";

type TaskOrTasks = Task<any> | Task<any>[];

interface Attrs {
  task: TaskOrTasks;
  render: (result: any, task: TaskOrTasks) => any;
  renderError?: (error: any, task: TaskOrTasks) => any;
  renderWorking?: (task: TaskOrTasks) => any;
}

type Vnode = m.Vnode<Attrs>;
  
export const TaskDisplay: m.Component<Attrs> = {
  view: (vnode: Vnode) => {
    const {attrs: {task, render, renderError, renderWorking}} = vnode;
    switch(getStatus(task)) {
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

function getStatus(taskOrTasks: TaskOrTasks) {
  if (Array.isArray(taskOrTasks)) {
    const statuses = taskOrTasks.map((task: Task<any>) => task.getStatus());
    if (statuses.indexOf("error") !== -1) return "error";
    if (statuses.indexOf("working") !== -1) return "working";
    return "done";
  } else {
    return taskOrTasks.getStatus();
  }
}

function getError(taskOrTasks: TaskOrTasks) {
  if (Array.isArray(taskOrTasks)) {
    return taskOrTasks
      .map((task: Task<any>) => task.getError())
      .filter((error: any) => error);
  } else {
    return taskOrTasks.getError();
  }
}

function getResult(taskOrTasks: TaskOrTasks) {
  if (Array.isArray(taskOrTasks)) {
    return taskOrTasks.map((task: Task<any>) => task.getResult());
  } else {
    return taskOrTasks.getResult();
  }
}
