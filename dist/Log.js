"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var log = function (type) {
    var context = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        context[_i - 1] = arguments[_i];
    }
    // tslint:disable-next-line:no-console
    console.log(type, context);
};
exports.log = log;
//# sourceMappingURL=Log.js.map