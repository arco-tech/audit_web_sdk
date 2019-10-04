"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
function initiate(initiateToken) {
    return API_1.request("post", "initiate", {
        jwt: initiateToken,
    });
}
exports.initiate = initiate;
//# sourceMappingURL=PublicFormInitiationAPI.js.map