import { Industry } from "../../Industry.js";
import { request } from "./API.js";
export function industries() {
    return request("get", "industries")
        .then((industriesData) => {
        return industriesData.map((industryData) => {
            return new Industry(industryData);
        });
    });
}
//# sourceMappingURL=IndustryAPI.js.map