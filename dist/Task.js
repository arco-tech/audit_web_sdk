"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(task, options) {
        if (options === void 0) { options = {}; }
        this.task = task;
        this.done = true;
        this.options = options || {};
        if (!this.options.hasOwnProperty("run") || this.options.run) {
            this.run();
        }
    }
    Task.prototype.run = function () {
        var _this = this;
        if (!this.promise) {
            this.done = false;
            this.error = null;
            this.promise = this.task().then(function (result) {
                _this.done = true;
                _this.result =
                    _this.options.process ? _this.options.process(result) : result;
                _this.promise = null;
                if (_this.options.onSuccess) {
                    _this.options.onSuccess(_this.result);
                }
                return result;
            }).catch(function (error) {
                _this.error = error || true;
                _this.promise = null;
                if (_this.options.onError) {
                    _this.options.onError(error);
                }
                throw error;
            });
        }
    };
    Task.prototype.hasError = function () {
        return this.error && !this.options.ignoreErrors ? true : false;
    };
    Task.prototype.isDone = function () {
        return this.done || (this.error && this.options.ignoreErrors);
    };
    Task.prototype.isWorking = function () {
        return !this.error && !this.done;
    };
    Task.prototype.getStatus = function () {
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
    };
    Task.prototype.getResult = function () {
        return this.result;
    };
    Task.prototype.getError = function () {
        return this.error;
    };
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=Task.js.map