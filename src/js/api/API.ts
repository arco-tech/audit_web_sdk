import * as m from "mithril";
import {apiEndpoint} from "../Environment";
import {loadAuthToken} from "../Storage";
import {
  RequestMethod,
  RequestOptions,
  RequestPath,
  Response,
} from "./APITypes";

const pathPrefix = "api/v1";

export function request<T>(
  method: RequestMethod,
  path: RequestPath,
  options: RequestOptions = {},
): Promise<T> {
  const url = `${apiEndpoint}/${pathPrefix}/${path}`;
  const token = options.jwt || loadAuthToken();
  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    };
  }
  return m.request({method, url, ...options})
    .then(({data}: any) => data as T);
}
