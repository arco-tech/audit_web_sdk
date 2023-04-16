import m from "mithril";
export const Header = {
    view: (vnode) => {
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