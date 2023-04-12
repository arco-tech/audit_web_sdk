"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate_form = exports.create = void 0;
var API_1 = require("./API");
function create(authToken, params) {
    return (0, API_1.request)("post", "", {
        jwt: authToken,
        body: { public_user: params },
    });
}
exports.create = create;
function authenticate_form(publicFormID, email, password) {
    return (0, API_1.request)("post", "authenticate", {
        body: {
            resource: "public_form.submission",
            public_form: publicFormID,
            public_user: { email: email, password: password },
        },
    });
}
exports.authenticate_form = authenticate_form;
//# sourceMappingURL=PublicUserAPI.js.map