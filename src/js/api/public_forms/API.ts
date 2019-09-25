import * as API from "../API";
import {RequestMethod, RequestPath, RequestOptions} from "../APITypes";

export function request<T>(
  method: RequestMethod,
  path: RequestPath,
  options: RequestOptions = {},
): Promise<T> {
  options = {pathPrefix: "api/public-forms/v1", ...options};
  return API.request(method, path, options);
}
