import test from "ava";
import { block, modifiers } from "../BEM.js";
test("block", (t) => {
    t.is(block("block"), ".block");
    t.is(block("block", "modifier"), ".block.block--modifier");
    t.is(block("block", ["modifier"]), ".block.block--modifier");
});
test("modifiers", (t) => {
    t.is(modifiers("block", ["m1", "m2"]), ".block--m1.block--m2");
});
//# sourceMappingURL=BEM.test.js.map