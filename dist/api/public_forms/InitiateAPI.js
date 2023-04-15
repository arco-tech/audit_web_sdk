import { request } from "./API.js";
export function initiate(initiateToken) {
    return request("post", "initiate", {
        jwt: initiateToken,
    });
}
//# sourceMappingURL=InitiateAPI.js.map