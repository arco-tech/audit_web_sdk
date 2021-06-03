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
var m = require("mithril");
var Environment_1 = require("../Environment");
var Storage_1 = require("../Storage");
var pathPrefix = "api/v1";
var config = {
    endpoint: Environment_1.apiEndpoint,
};
function request(method, path, options) {
    if (options === void 0) { options = {}; }
    var prefix = options.pathPrefix || pathPrefix;
    var url = Environment_1.apiEndpoint + "/" + prefix + "/" + path;
    var token = options.jwt || Storage_1.loadAuthToken();
    if (token) {
        options.headers = __assign({ Authorization: "Bearer " + token }, (options.headers || {}));
    }
    return m.request(__assign({ method: method, url: url }, options))
        .then(function (_a) {
        var data = _a.data;
        return data;
    })
        .catch(function (error) {
        throw error;
    });
}
exports.request = request;
function setEndpoint(endpoint) {
    config.endpoint = endpoint;
}
exports.setEndpoint = setEndpoint;
//# sourceMappingURL=API.js.map