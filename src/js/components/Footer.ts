import * as m from "mithril";
import {block} from "../BEM";
import {Column} from "./Column";
import {ColumnContainer} from "./ColumnContainer";

interface Attrs {}

type Vnode = m.Vnode<Attrs>;

export const Footer: m.Component<Attrs> = {
  view: (vnode: Vnode) => {
    return m(".footer", [
      m(".footer__content", [
        m(ColumnContainer, {
          selector: ".section__content--large.margin-x-auto",
          modifiers: "large-cut-off",
        }, [
          m(Column, {selector: ".footer__block.padding-right-medium", flex: 1}, [
            m(ColumnContainer, [
              m(Column, {flex: 1, selector: ".padding-right-small"}, [
                m("h4.footer__title", "ABOUT"),
                m("a.footer__link", {
                  href: "https://about.businesslinkpacific.com",
                }, "About BLP"),
                m("a.footer__link", {
                  href:
                    "https://about.businesslinkpacific.com/terms/",
                }, "Terms of service"),
                m("a.footer__link", {
                  href: "https://about.businesslinkpacific.com/privacy/",
                }, "Privacy policy"),
              ]),
              m(Column, {flex: 1}, [
                m("h4.footer__title", "FOLLOW US"),
                m("a" + block("footer__link", ["icon", "facebook-icon"]), {
                  href: "https://facebook.com/businesslinkpacific",
                }, "Facebook"),
                m("a" + block("footer__link", ["icon", "twitter-icon"]), {
                  href: "https://twitter.com/businesslinkpac",
                }, "Twitter"),
                m("a" + block("footer__link", ["icon", "linkedin-icon"]), {
                  href: "https://linkedin.com/company/business-link-pacific",
                }, "Linkedin"),
              ]),
            ]),
          ]),
          m(Column, {selector: ".padding-x-medium", flex: 1}, [
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
          m(Column, {selector: ".padding-left-medium", flex: 1}, [
            m(".footer__block", [
              m("h4.footer__title", "PARTNERS"),
              m(".footer__text", [
                "Supported by the New Zealand Aid Programme and implemented ",
                "by DT Global ",
              ]),
            ]),
            m(ColumnContainer, {
              selector: ".margin-top-medium",
              modifiers: "align-center"
            }, [
              m(Column, [
                m("img.footer__partner-logo", {
                  src: "/images/" +
                    "nz-foreign-affairs-and-trade-aid-programme-logo-white.png",
                }),
              ]),
              m(Column, [
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
