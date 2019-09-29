"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Questions_1 = require("../Questions");
var _PublishedFormMocks_1 = require("./_PublishedFormMocks");
ava_1.default("isComplete text", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({ type: "text" });
    t.is(Questions_1.isComplete(question, null), false);
    t.is(Questions_1.isComplete(question, ""), false);
    t.is(Questions_1.isComplete(question, " \n\r"), false);
    t.is(Questions_1.isComplete(question, 123), false);
    t.is(Questions_1.isComplete(question, { what: "the" }), false);
    t.is(Questions_1.isComplete(question, "ok"), true);
});
ava_1.default("isComplete multi_text", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({ type: "multi_text" });
    t.is(Questions_1.isComplete(question, []), false);
    t.is(Questions_1.isComplete(question, null), false);
    t.is(Questions_1.isComplete(question, ["", " ", "\n \r"]), false);
    t.is(Questions_1.isComplete(question, [321]), false);
    t.is(Questions_1.isComplete(question, ["ok"]), true);
});
ava_1.default("isComplete number", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({ type: "number" });
    t.is(Questions_1.isComplete(question, null), false);
    t.is(Questions_1.isComplete(question, "36"), false);
    t.is(Questions_1.isComplete(question, 0), true);
    t.is(Questions_1.isComplete(question, 52), true);
    t.is(Questions_1.isComplete(question, 0.5), true);
});
ava_1.default("isComplete percentage", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({ type: "percentage" });
    t.is(Questions_1.isComplete(question, null), false);
    t.is(Questions_1.isComplete(question, "36"), false);
    t.is(Questions_1.isComplete(question, 0), true);
    t.is(Questions_1.isComplete(question, 52), true);
    t.is(Questions_1.isComplete(question, 0.5), true);
});
ava_1.default("isComplete button", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({
        type: "button",
        options: [_PublishedFormMocks_1.mockOptionData({ id: 1 })],
    });
    t.is(Questions_1.isComplete(question, null), false);
    t.is(Questions_1.isComplete(question, "1"), false);
    t.is(Questions_1.isComplete(question, 2), false);
    t.is(Questions_1.isComplete(question, 1), true);
});
ava_1.default("isComplete multi_button", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({
        type: "multi_button",
        options: [_PublishedFormMocks_1.mockOptionData({ id: 1 })],
    });
    t.is(Questions_1.isComplete(question, null), true);
    t.is(Questions_1.isComplete(question, "abc"), true);
    t.is(Questions_1.isComplete(question, 34), true);
    t.is(Questions_1.isComplete(question, []), true);
    t.is(Questions_1.isComplete(question, [1]), true);
});
ava_1.default("isComplete dropdown", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({
        type: "dropdown",
        options: [_PublishedFormMocks_1.mockOptionData({ id: 1 })],
    });
    t.is(Questions_1.isComplete(question, null), false);
    t.is(Questions_1.isComplete(question, "1"), false);
    t.is(Questions_1.isComplete(question, 2), false);
    t.is(Questions_1.isComplete(question, 1), true);
});
ava_1.default("isComplete date", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({ type: "date" });
    t.is(Questions_1.isComplete(question, null), false);
    t.is(Questions_1.isComplete(question, "nope"), false);
    t.is(Questions_1.isComplete(question, "2019-45-01"), false);
    t.is(Questions_1.isComplete(question, "2019-01-01"), true);
    t.is(Questions_1.isComplete(question, "2019-01-01T00:00:00.000Z"), true);
});
ava_1.default("isComplete date_range", function (t) {
    var question = _PublishedFormMocks_1.mockQuestion({ type: "date_range" });
    t.is(Questions_1.isComplete(question, null), false);
    t.is(Questions_1.isComplete(question, "nope"), false);
    t.is(Questions_1.isComplete(question, "2019-01-01"), false);
    t.is(Questions_1.isComplete(question, { from: "2019-01-01" }), false);
    t.is(Questions_1.isComplete(question, { to: "2019-01-01" }), false);
    t.is(Questions_1.isComplete(question, { from: null, to: null }), false);
    t.is(Questions_1.isComplete(question, { from: "2019-01-01", to: "2019-01-01" }), true);
});
//# sourceMappingURL=Questions.test.js.map