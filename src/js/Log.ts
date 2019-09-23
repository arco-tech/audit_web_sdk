type LogType = "debug" | "info" | "error";

export const log = (type: LogType, ...context: any[]) => {
  // tslint:disable-next-line:no-console
  console.log(type, context);
};
