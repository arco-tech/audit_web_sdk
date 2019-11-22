"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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