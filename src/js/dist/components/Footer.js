"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../BEM");
var Column_1 = require("./Column");
var ColumnContainer_1 = require("./ColumnContainer");
exports.Footer = {
    view: function (vnode) {
        return m(".footer", [
            m(".footer__content", [
                m(ColumnContainer_1.ColumnContainer, {
                    selector: ".section__content--large.margin-x-auto",
                    modifiers: "large-cut-off",
                }, [
                    m(Column_1.Column, { selector: ".footer__block.padding-right-medium", flex: 1 }, [
                        m(ColumnContainer_1.ColumnContainer, [
                            m(Column_1.Column, { flex: 1, selector: ".padding-right-small" }, [
                                m("h4.footer__title", "ABOUT"),
                                m("a.footer__link", {
                                    href: "https://about.businesslinkpacific.com",
                                }, "About BLP"),
                                m("a.footer__link", {
                                    href: "https://about.businesslinkpacific.com/terms/",
                                }, "Terms of service"),
                                m("a.footer__link", {
                                    href: "https://about.businesslinkpacific.com/privacy/",
                                }, "Privacy policy"),
                            ]),
                            m(Column_1.Column, { flex: 1 }, [
                                m("h4.footer__title", "FOLLOW US"),
                                m("a" + BEM_1.block("footer__link", ["icon", "facebook-icon"]), {
                                    href: "https://facebook.com/businesslinkpacific",
                                }, "Facebook"),
                                m("a" + BEM_1.block("footer__link", ["icon", "twitter-icon"]), {
                                    href: "https://twitter.com/businesslinkpac",
                                }, "Twitter"),
                                m("a" + BEM_1.block("footer__link", ["icon", "linkedin-icon"]), {
                                    href: "https://linkedin.com/company/business-link-pacific",
                                }, "Linkedin"),
                            ]),
                        ]),
                    ]),
                    m(Column_1.Column, { selector: ".padding-x-medium", flex: 1 }, [
                        m(".footer__block", [
                            m("h4.footer__title", "GENERAL ENQUIRIES"),
                            m("a.footer__link", {
                                href: "mailto:info@businesslinkpacific.com",
                            }, "info@businesslinkpacific.com"),
                        ]),
                        m(".footer__block", [
                            m("h4.footer__title", "COUNTRY SPECIFIC ENQUIRIES"),
                            m("a.footer__link", {
                                href: "mailto:fiji@businesslinkpacific.com",
                            }, "fiji@businesslinkpacific.com"),
                            m("a.footer__link", {
                                href: "mailto:samoa@businesslinkpacific.com",
                            }, "samoa@businesslinkpacific.com"),
                            m("a.footer__link", {
                                href: "mailto:vanuatu@businesslinkpacific.com",
                            }, "vanuatu@businesslinkpacific.com"),
                            m("a.footer__link", {
                                href: "mailto:png@businesslinkpacific.com",
                            }, "png@businesslinkpacific.com"),
                        ]),
                    ]),
                    m(Column_1.Column, { selector: ".padding-left-medium", flex: 1 }, [
                        m(".footer__block", [
                            m("h4.footer__title", "PARTNERS"),
                            m(".footer__text", [
                                "Supported by the New Zealand Aid Programme and implemented ",
                                "by DT Global ",
                            ]),
                        ]),
                        m(ColumnContainer_1.ColumnContainer, {
                            selector: ".margin-top-medium",
                            modifiers: "align-center"
                        }, [
                            m(Column_1.Column, [
                                m("img.footer__partner-logo", {
                                    src: "/images/" +
                                        "nz-foreign-affairs-and-trade-aid-programme-logo-white.png",
                                }),
                            ]),
                            m(Column_1.Column, [
                                m("img.footer__partner-logo", {
                                    src: "/images/dt-global-logo-white.svg",
                                }),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
            m(".footer__feedback-row", [
                m("h4.footer__feedback-row__text", [
                    m("span.color-white", "Questions or feedback? "),
                    m("a", {
                        href: "https://about.businesslinkpacific.com/contact-us/",
                    }, "Contact us"),
                ]),
            ]),
        ]);
    },
};
//# sourceMappingURL=Footer.js.map