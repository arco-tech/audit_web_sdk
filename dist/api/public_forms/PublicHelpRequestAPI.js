import { request } from "./API.js";
export function create(params) {
    return request("post", "public-help-requests", {
        body: { public_help_request: params },
    });
}
//# sourceMappingURL=PublicHelpRequestAPI.js.map