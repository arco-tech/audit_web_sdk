import { request } from "./API.js";
export function create(authToken, params) {
    return request("post", "", {
        jwt: authToken,
        body: { public_user: params },
    });
}
export function authenticate_form(publicFormID, email, password) {
    return request("post", "authenticate", {
        body: {
            resource: "public_form.submission",
            public_form: publicFormID,
            public_user: { email, password },
        },
    });
}
//# sourceMappingURL=PublicUserAPI.js.map