var _this = this;
if (!Array.prototype.find) {
    Array.prototype.find = function (matcher) {
        if (typeof matcher !== "function") {
            throw new Error("matcher must be a function");
        }
        for (var index = 0; index < _this.length; index++) {
            if (matcher(value, index, _this)) {
                return value;
            }
        }
    };
}
if (!Array.prototype.findIndex) {
    Array.prototype.find = function (matcher) {
        if (typeof matcher !== "function") {
            throw new Error("matcher must be a function");
        }
        for (var index = 0; index < _this.length; index++) {
            if (matcher(value, index, _this)) {
                return index;
            }
        }
    };
}
//# sourceMappingURL=Array.js.map