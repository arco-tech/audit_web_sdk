import * as API from "../API.js";
export function request(method, path, options = {}) {
    options = { pathPrefix: "api/public-forms/v1", ...options };
    return API.request(method, path, options);
}
//# sourceMappingURL=API.js.map