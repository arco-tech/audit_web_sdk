"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mount = exports.createElement = void 0;
var m = require("mithril");
function createElement(parent) {
    var element = document.createElement("div");
    (parent || document.body).appendChild(element);
    return element;
}
exports.createElement = createElement;
function mount(content) {
    var element = createElement();
    return new Promise(function (resolve) {
        m.mount(element, {
            oncreate: function (vnode) { return resolve(vnode.dom); },
            view: function (vnode) { return content; },
        });
    });
}
exports.mount = mount;
//# sourceMappingURL=Mock.js.map