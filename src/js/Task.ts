export class Task<T> {
  task: () => Promise<T>;
  promise: Promise<T> | null;
  done: boolean;
  result: T | any;
  error: any;
  options: {[key: string]: any};

  constructor(task: () => Promise<T>, options={}) {
    this.task = task;
    this.done = true;
    this.options = options || {};
    if (!this.options.hasOwnProperty("run") || this.options.run) {
      this.run();
    }
  }

  run(): void {
    if (!this.promise) {
      this.done = false;
      this.error = null;
      this.promise = this.task().then((result: T) => {
        this.done = true;
        this.result =
          this.options.process ? this.options.process(result) : result;
        this.promise = null;
        if (this.options.onSuccess) { this.options.onSuccess(this.result); }
        return result;
      }).catch((error) => {
        this.error = error || true;
        this.promise = null;
        if (this.options.onError) { this.options.onError(error); }
        throw error;
      });
    }
  }

  hasError(): boolean {
    return this.error && !this.options.ignoreErrors ? true : false;
  }

  isDone(): boolean {
    return this.done || (this.error && this.options.ignoreErrors);
  }

  isWorking(): boolean {
    return !this.error && !this.done;
  }

  getStatus(): "done" | "error" | "working" {
    if (this.done) {
      return "done";
    } else if (this.error) {
      if (this.options.ignoreErrors) {
        return "done";
      } else {
        return "error";
      }
    }
    return "working";
  }

  getResult(): T | null {
    return this.result;
  }

  getError(): any {
    return this.error;
  }
}
