export type RequestMethod = "get" | "post" | "put" | "patch" | "delete";

export type RequestPath = string;

export interface RequestOptions {
  body?: any;
  headers?: {[key: string]: any};
  jwt?: string;
}

export interface Response {
  data?: {[key: string]: any} | Array<{[key: string]: any}>;
  error_type?: "changeset" | "not_found" | "forbidden" | "internal";
  errors?: {[field: string]: string[]};
}
