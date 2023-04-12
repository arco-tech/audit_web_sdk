"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var BEM_1 = require("../BEM");
(0, ava_1.default)("block", function (t) {
    t.is((0, BEM_1.block)("block"), ".block");
    t.is((0, BEM_1.block)("block", "modifier"), ".block.block--modifier");
    t.is((0, BEM_1.block)("block", ["modifier"]), ".block.block--modifier");
});
(0, ava_1.default)("modifiers", function (t) {
    t.is((0, BEM_1.modifiers)("block", ["m1", "m2"]), ".block--m1.block--m2");
});
//# sourceMappingURL=BEM.test.js.map