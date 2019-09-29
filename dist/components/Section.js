"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
var BEM_1 = require("../BEM");
exports.Section = {
    view: function (_a) {
        var _b = _a.attrs, _c = _b.selector, selector = _c === void 0 ? "" : _c, _d = _b.contentModifiers, contentModifiers = _d === void 0 ? [] : _d, _e = _b.modifiers, modifiers = _e === void 0 ? [] : _e, children = _a.children;
        return m(selector + BEM_1.block("section", modifiers), [
            m(BEM_1.block("section__content", contentModifiers), children),
        ]);
    },
};
//# sourceMappingURL=Section.js.map