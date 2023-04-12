"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var API_1 = require("./API");
function upload(params) {
    var body = { file_upload: params };
    return (0, API_1.request)("post", "file-uploads", { body: body });
}
exports.upload = upload;
//# sourceMappingURL=FileUploadAPI.js.map