import * as API from "../API.js";
import {RequestMethod, RequestPath, RequestOptions} from "../APITypes.js";

export function request<T>(
  method: RequestMethod,
  path: RequestPath,
  options: RequestOptions = {},
): Promise<T> {
  options = {pathPrefix: "api/public/v1", ...options};
  return API.request(method, path, options);
}
