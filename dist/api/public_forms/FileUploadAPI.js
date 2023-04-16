import { request } from "./API.js";
export function upload(params) {
    const body = { file_upload: params };
    return request("post", "file-uploads", { body });
}
//# sourceMappingURL=FileUploadAPI.js.map