"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromBase64(base64) {
    if (window.atob) {
        return window.atob(base64);
    }
    else {
        return Buffer.from(base64, "base64").toString();
    }
}
function decodePayload(token) {
    return JSON.parse(fromBase64(token.split(".")[1]));
}
exports.decodePayload = decodePayload;
function isValid(token) {
    if (!token) {
        return false;
    }
    var now = new Date();
    var exp = decodePayload(token).exp;
    var expires = new Date(exp * 1000);
    return expires.getTime() > now.getTime();
}
exports.isValid = isValid;
//# sourceMappingURL=JWT.js.map