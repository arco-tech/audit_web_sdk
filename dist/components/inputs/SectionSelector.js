"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../../BEM");
exports.SectionSelector = {
    view: function (_a) {
        var _b = _a.attrs, sections = _b.sections, changeset = _b.changeset;
        return sections.map(function (section) {
            var active = changeset.getValue(section.id()) || false;
            return m(".icon-selector", {
                onclick: function () {
                    changeset.change(section.id(), active ? false : true);
                },
            }, [
                m(BEM_1.block("icon-selector__icon", active ? "active" : []), {
                    style: "background-image: url(\"" + section.iconURL() + "\")",
                }),
                m(".icon-selector__label", section.name()),
            ]);
        });
    },
};
//# sourceMappingURL=SectionSelector.js.map