"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var m = require("mithril");
exports.Header = {
    view: function (vnode) {
        return m(".header", [
            m("a", {
                href: "https://businesslinkpacific.com",
                target: "_blank",
            }, [
                m("img.header__logo", {
                    src: "/images/blp-logo-white.svg",
                }),
            ]),
        ]);
    },
};
//# sourceMappingURL=Header.js.map