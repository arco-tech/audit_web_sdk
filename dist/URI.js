"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildParams = exports.param = void 0;
function param(name) {
    var params = window.location.search.replace("?", "").split("&");
    for (var index in params) {
        var param_1 = params[index].split("=");
        var key = decodeURIComponent(param_1[0]);
        if (key === name) {
            return decodeURIComponent(param_1.length === 1 ? "" : param_1[1]);
        }
    }
}
exports.param = param;
function buildParams(params) {
    return Object.keys(params)
        .filter(function (key) { return params[key]; })
        .map(function (key) {
        if (params[key]) {
            return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(params[key]));
        }
    })
        .join("&");
}
exports.buildParams = buildParams;
//# sourceMappingURL=URI.js.map