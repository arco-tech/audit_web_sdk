import {FormType, FormTypeJSON} from "../../FormType";
import {request} from "./API";

export function formType(id): Promise<FormType> {
  return request<FormTypeJSON>("get", "form-types/" + id)
    .then((formTypeJSON: FormTypeJSON) => new FormType(formTypeJSON));
}
