import * as m from "mithril";
import {apiEndpoint} from "../Environment.js";
import {loadAuthToken} from "../Storage.js";
import {
  RequestMethod,
  RequestOptions,
  RequestPath,
  Response,
} from "./APITypes.js";

const pathPrefix = "api/v1";

const config: {endpoint: string} = {
  endpoint: apiEndpoint,
};

export function request<T>(
  method: RequestMethod,
  path: RequestPath,
  options: RequestOptions = {},
): Promise<T> {
  const prefix = options.pathPrefix || pathPrefix;
  const url = `${apiEndpoint}/${prefix}/${path}`;
  const token = options.jwt || loadAuthToken();
  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    };
  }
  return m.request({method, url, ...options})
    .then(({data}: any) => data as T)
    .catch((error) => {
      throw error;
    })
}

export function setEndpoint(endpoint: string): void {
  config.endpoint = endpoint;
}
