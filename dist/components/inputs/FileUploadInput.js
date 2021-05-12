"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var FileUploadAPI = require("../../api/public_forms/FileUploadAPI");
exports.FileUploadInput = {
    oninit: function (_a) {
        var state = _a.state;
        state.statuses = [];
    },
    view: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name, questionID = _b.questionID, state = _a.state;
        var value = (changeset.getValue(name) || []);
        return [
            m("input", {
                type: "file",
                multiple: true,
                value: changeset.getValue(name),
                oninput: function (event) {
                    Array.from(event.target.files).forEach(function (file) {
                        upload(file, questionID, state)
                            .then(function (_a) {
                            var id = _a.id, name = _a.name;
                            var value = changeset.getValue(name) || [];
                            changeset.change(name, value.concat([{ id: id, name: name }]));
                        });
                    });
                    event.target.value = "";
                },
            }),
            state.statuses.map(function (_a) {
                var name = _a.name, status = _a.status;
                if (status !== "success") {
                    return m(".file-input__status", name + " - " + status);
                }
            }),
            value.map(function (_a, index) {
                var name = _a.name;
                return m(".file-input__value", [
                    m(".file-input__value__name", name),
                    m(".file-input__value__remove-button", {
                        onclick: function () {
                            changeset.setValue(name, [].concat(value.splice(index, 1)));
                        },
                    }, "remove"),
                ]);
            })
        ];
    },
};
function upload(file, questionID, state) {
    var uploadStatus = { name: file.name, status: "uploading..." };
    state.statuses.push(uploadStatus);
    return new Promise(function (resolve, reject) {
        file.text()
            .then(function (content) {
            FileUploadAPI.upload({
                name: file.name,
                content: content,
                question_id: questionID,
            })
                .then(function (fileUpload) {
                uploadStatus.status = "success";
                resolve(fileUpload);
                m.redraw();
            })
                .catch(function (error) {
                uploadStatus.status = "failed";
                reject(error);
                m.redraw();
            });
        })
            .catch(function (error) {
            uploadStatus.status = "failed";
            reject(error);
            m.redraw();
        });
    });
}
//# sourceMappingURL=FileUploadInput.js.map