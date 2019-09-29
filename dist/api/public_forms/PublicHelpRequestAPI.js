"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
function create(params) {
    return API_1.request("post", "public-help-requests", {
        body: { public_help_request: params },
    });
}
exports.create = create;
//# sourceMappingURL=PublicHelpRequestAPI.js.map