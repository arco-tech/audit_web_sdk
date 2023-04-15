export class Task {
    constructor(task, options = {}) {
        this.task = task;
        this.done = true;
        this.options = options || {};
        if (!this.options.hasOwnProperty("run") || this.options.run) {
            this.run();
        }
    }
    run() {
        if (!this.promise) {
            this.done = false;
            this.error = null;
            this.promise = this.task().then((result) => {
                this.done = true;
                this.result =
                    this.options.process ? this.options.process(result) : result;
                this.promise = null;
                if (this.options.onSuccess) {
                    this.options.onSuccess(this.result);
                }
                return result;
            }).catch((error) => {
                this.error = error || true;
                this.promise = null;
                if (this.options.onError) {
                    this.options.onError(error);
                }
                throw error;
            });
        }
    }
    hasError() {
        return this.error && !this.options.ignoreErrors ? true : false;
    }
    isDone() {
        return this.done || (this.error && this.options.ignoreErrors);
    }
    isWorking() {
        return !this.error && !this.done;
    }
    getStatus() {
        if (this.done) {
            return "done";
        }
        else if (this.error) {
            if (this.options.ignoreErrors) {
                return "done";
            }
            else {
                return "error";
            }
        }
        return "working";
    }
    getResult() {
        return this.result;
    }
    getError() {
        return this.error;
    }
}
//# sourceMappingURL=Task.js.map