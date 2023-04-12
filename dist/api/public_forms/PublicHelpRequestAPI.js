"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var API_1 = require("./API");
function create(params) {
    return (0, API_1.request)("post", "public-help-requests", {
        body: { public_help_request: params },
    });
}
exports.create = create;
//# sourceMappingURL=PublicHelpRequestAPI.js.map