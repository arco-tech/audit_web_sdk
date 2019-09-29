"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var API = require("../API");
function request(method, path, options) {
    if (options === void 0) { options = {}; }
    options = __assign({ pathPrefix: "api/public-forms/v1" }, options);
    return API.request(method, path, options);
}
exports.request = request;
//# sourceMappingURL=API.js.map