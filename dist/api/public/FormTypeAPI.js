import { FormType } from "../../FormType.js";
import { request } from "./API.js";
export function formType(id) {
    return request("get", "form-types/" + id)
        .then((formTypeJSON) => new FormType(formTypeJSON));
}
//# sourceMappingURL=FormTypeAPI.js.map