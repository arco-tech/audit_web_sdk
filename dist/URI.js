"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function param(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    if (results !== null && typeof results[1] === "string") {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    else {
        return null;
    }
}
exports.param = param;
function buildParams(params) {
    return Object.keys(params)
        .filter(function (key) { return params[key]; })
        .map(function (key) {
        if (params[key]) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }
    })
        .join("&");
}
exports.buildParams = buildParams;
//# sourceMappingURL=URI.js.map