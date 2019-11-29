"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Grammar_1 = require("../Grammar");
ava_1.default("capitalise", function (t) {
    t.is(Grammar_1.capitalise("test string"), "Test string");
    t.is(Grammar_1.capitalise("Already capitalised"), "Already capitalised");
    t.is(Grammar_1.capitalise("  whitespace  \n"), "Whitespace");
    t.is(Grammar_1.capitalise(""), "");
    t.is(Grammar_1.capitalise("  \n \r"), "");
});
ava_1.default("fullStop", function (t) {
    t.is(Grammar_1.fullStop("test string"), "test string.");
    t.is(Grammar_1.fullStop("already has full stop."), "already has full stop.");
    t.is(Grammar_1.fullStop("semicolon;"), "semicolon;");
    t.is(Grammar_1.fullStop("question?"), "question?");
    t.is(Grammar_1.fullStop(""), "");
    t.is(Grammar_1.fullStop(" whitespace  \n"), "whitespace.");
    t.is(Grammar_1.fullStop("  \n  \r  "), "");
});
ava_1.default("sentence", function (t) {
    t.is(Grammar_1.sentence("some text"), "Some text.");
    t.is(Grammar_1.sentence("Already good to go."), "Already good to go.");
    t.is(Grammar_1.sentence("  whitespace \n"), "Whitespace.");
    t.is(Grammar_1.sentence("question? \n"), "Question?");
    t.is(Grammar_1.sentence(""), "");
    t.is(Grammar_1.sentence("   \n \r "), "");
});
//# sourceMappingURL=Grammar.test.js.map