import {FormType, FormTypeJSON} from "../../FormType.js";
import {request} from "./API.js";

export function formType(id): Promise<FormType> {
  return request<FormTypeJSON>("get", "form-types/" + id)
    .then((formTypeJSON: FormTypeJSON) => new FormType(formTypeJSON));
}
