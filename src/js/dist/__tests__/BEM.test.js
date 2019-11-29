"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var BEM_1 = require("../BEM");
ava_1.default("block", function (t) {
    t.is(BEM_1.block("block"), ".block");
    t.is(BEM_1.block("block", "modifier"), ".block.block--modifier");
    t.is(BEM_1.block("block", ["modifier"]), ".block.block--modifier");
});
ava_1.default("modifiers", function (t) {
    t.is(BEM_1.modifiers("block", ["m1", "m2"]), ".block--m1.block--m2");
});
//# sourceMappingURL=BEM.test.js.map