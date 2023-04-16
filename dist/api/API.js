import * as m from "mithril";
import { apiEndpoint } from "../Environment.js";
import { loadAuthToken } from "../Storage.js";
const pathPrefix = "api/v1";
const config = {
    endpoint: apiEndpoint,
};
export function request(method, path, options = {}) {
    const prefix = options.pathPrefix || pathPrefix;
    const url = `${apiEndpoint}/${prefix}/${path}`;
    const token = options.jwt || loadAuthToken();
    if (token) {
        options.headers = {
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        };
    }
    return m.request({ method, url, ...options })
        .then(({ data }) => data)
        .catch((error) => {
        throw error;
    });
}
export function setEndpoint(endpoint) {
    config.endpoint = endpoint;
}
//# sourceMappingURL=API.js.map