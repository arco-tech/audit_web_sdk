"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
function create(authToken, params) {
    return API_1.request("post", "", {
        jwt: authToken,
    });
}
exports.create = create;
//# sourceMappingURL=PublicUserAPI.js.map