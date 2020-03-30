import test from "ava";
import {isComplete} from "../Questions";
import {mockOptionData, mockQuestion} from "../tests/PublishedFormMocks";

test("isComplete text", (t) => {
  const question = mockQuestion({type: "text"});
  t.is(isComplete(question, null), false);
  t.is(isComplete(question, ""), false);
  t.is(isComplete(question, " \n\r"), false);
  t.is(isComplete(question, 123), false);
  t.is(isComplete(question, {what: "the"}), false);
  t.is(isComplete(question, "ok"), true);
});

test("isComplete multi_text", (t) => {
  const question = mockQuestion({type: "multi_text"});
  t.is(isComplete(question, []), false);
  t.is(isComplete(question, null), false);
  t.is(isComplete(question, ["", " ", "\n \r"]), false);
  t.is(isComplete(question, [321]), false);
  t.is(isComplete(question, ["ok"]), true);
});

test("isComplete number", (t) => {
  const question = mockQuestion({type: "number"});
  t.is(isComplete(question, null), false);
  t.is(isComplete(question, "36"), false);
  t.is(isComplete(question, 0), true);
  t.is(isComplete(question, 52), true);
  t.is(isComplete(question, 0.5), true);
});

test("isComplete percentage", (t) => {
  const question = mockQuestion({type: "percentage"});
  t.is(isComplete(question, null), false);
  t.is(isComplete(question, "36"), false);
  t.is(isComplete(question, 0), true);
  t.is(isComplete(question, 52), true);
  t.is(isComplete(question, 0.5), true);
});

test("isComplete button", (t) => {
  const question =
    mockQuestion({
      type: "button",
      options: [mockOptionData({id: 1})],
    });
  t.is(isComplete(question, null), false);
  t.is(isComplete(question, "1"), false);
  t.is(isComplete(question, 2), false);
  t.is(isComplete(question, 1), true);
});

test("isComplete multi_button", (t) => {
  const question =
    mockQuestion({
      type: "multi_button",
      options: [mockOptionData({id: 1})],
    });
  t.is(isComplete(question, null), true);
  t.is(isComplete(question, "abc"), true);
  t.is(isComplete(question, 34), true);
  t.is(isComplete(question, []), true);
  t.is(isComplete(question, [1]), true);
});

test("isComplete dropdown", (t) => {
  const question =
    mockQuestion({
      type: "dropdown",
      options: [mockOptionData({id: 1})],
    });
  t.is(isComplete(question, null), false);
  t.is(isComplete(question, "1"), false);
  t.is(isComplete(question, 2), false);
  t.is(isComplete(question, 1), true);
});

test("isComplete date", (t) => {
  const question = mockQuestion({type: "date"});
  t.is(isComplete(question, null), false);
  t.is(isComplete(question, "nope"), false);
  t.is(isComplete(question, "2019-45-01"), false);
  t.is(isComplete(question, "2019-01-01"), true);
  t.is(isComplete(question, "2019-01-01T00:00:00.000Z"), true);
});

test("isComplete date_range", (t) => {
  const question = mockQuestion({type: "date_range"});
  t.is(isComplete(question, null), false);
  t.is(isComplete(question, "nope"), false);
  t.is(isComplete(question, "2019-01-01"), false);
  t.is(isComplete(question, {from: "2019-01-01"}), true);
  t.is(isComplete(question, {to: "2019-01-01"}), false);
  t.is(isComplete(question, {from: null, to: null}), false);
  t.is(isComplete(question, {from: "2019-01-01", to: "2019-01-01"}), true);
});
