"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decodePayload(token) {
    return JSON.parse(atob(token.split(".")[1]));
}
exports.decodePayload = decodePayload;
//# sourceMappingURL=JWT.js.map