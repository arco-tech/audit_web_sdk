"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Grammar_1 = require("../Grammar");
(0, ava_1.default)("capitalise", function (t) {
    t.is((0, Grammar_1.capitalise)("test string"), "Test string");
    t.is((0, Grammar_1.capitalise)("Already capitalised"), "Already capitalised");
    t.is((0, Grammar_1.capitalise)("  whitespace  \n"), "Whitespace");
    t.is((0, Grammar_1.capitalise)(""), "");
    t.is((0, Grammar_1.capitalise)("  \n \r"), "");
});
(0, ava_1.default)("fullStop", function (t) {
    t.is((0, Grammar_1.fullStop)("test string"), "test string.");
    t.is((0, Grammar_1.fullStop)("already has full stop."), "already has full stop.");
    t.is((0, Grammar_1.fullStop)("semicolon;"), "semicolon;");
    t.is((0, Grammar_1.fullStop)("question?"), "question?");
    t.is((0, Grammar_1.fullStop)(""), "");
    t.is((0, Grammar_1.fullStop)(" whitespace  \n"), "whitespace.");
    t.is((0, Grammar_1.fullStop)("  \n  \r  "), "");
});
(0, ava_1.default)("sentence", function (t) {
    t.is((0, Grammar_1.sentence)("some text"), "Some text.");
    t.is((0, Grammar_1.sentence)("Already good to go."), "Already good to go.");
    t.is((0, Grammar_1.sentence)("  whitespace \n"), "Whitespace.");
    t.is((0, Grammar_1.sentence)("question? \n"), "Question?");
    t.is((0, Grammar_1.sentence)(""), "");
    t.is((0, Grammar_1.sentence)("   \n \r "), "");
});
//# sourceMappingURL=Grammar.test.js.map