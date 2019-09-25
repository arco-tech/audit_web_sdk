import test from "ava";
import {capitalise, fullStop, sentence} from "../Grammar";

test("capitalise", (t) => {
  t.is(capitalise("test string"), "Test string");
  t.is(capitalise("Already capitalised"), "Already capitalised");
  t.is(capitalise("  whitespace  \n"), "Whitespace");
  t.is(capitalise(""), "");
  t.is(capitalise("  \n \r"), "");
});

test("fullStop", (t) => {
  t.is(fullStop("test string"), "test string.");
  t.is(fullStop("already has full stop."), "already has full stop.");
  t.is(fullStop("semicolon;"), "semicolon;");
  t.is(fullStop("question?"), "question?");
  t.is(fullStop(""), "");
  t.is(fullStop(" whitespace  \n"), "whitespace.");
  t.is(fullStop("  \n  \r  "), "");
});

test("sentence", (t) => {
  t.is(sentence("some text"), "Some text.");
  t.is(sentence("Already good to go."), "Already good to go.");
  t.is(sentence("  whitespace \n"), "Whitespace.");
  t.is(sentence("question? \n"), "Question?");
  t.is(sentence(""), "");
  t.is(sentence("   \n \r "), "");
});
