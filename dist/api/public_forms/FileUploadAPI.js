"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
function upload(params) {
    var body = { file_upload: params };
    return API_1.request("post", "file-uploads", { body: body });
}
exports.upload = upload;
//# sourceMappingURL=FileUploadAPI.js.map