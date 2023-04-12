"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiate = void 0;
var API_1 = require("./API");
function initiate(initiateToken) {
    return (0, API_1.request)("post", "initiate", {
        jwt: initiateToken,
    });
}
exports.initiate = initiate;
//# sourceMappingURL=InitiateAPI.js.map