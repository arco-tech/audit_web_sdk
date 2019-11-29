"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var Footer_1 = require("./Footer");
var Header_1 = require("./Header");
exports.Screen = {
    oncreate: function (vnode) {
        window.scrollTo(0, 0);
    },
    view: function (vnode) {
        return m(".screen" + (vnode.attrs.selector || ""), [
            m(Header_1.Header),
            m(".screen__content", vnode.children),
            m(Footer_1.Footer),
        ]);
    },
};
//# sourceMappingURL=Screen.js.map