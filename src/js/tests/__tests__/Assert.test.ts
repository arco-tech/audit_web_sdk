import test from "ava";
import * as m from "mithril";
import * as Mock from "../Mock.js";
import * as Assert from "../Assert.js";

test("findElementForText successfully finds text", async (t) => {
  const element = await Mock.mount(m("div", [
    "test_text_1",
    m("p", ["testing test_text_2 surrounded"]),
    m("div", [
      m("span", "then test_text_3"),
    ]),
  ]));
  t.true(Assert.findElementForText(element, "test_text_1"));
  t.true(Assert.findElementForText(element, "test_text_2"));
  t.true(Assert.findElementForText(element, "test_text_3"));
});

test("findElementForText successfully doesn't find text", async (t) => {
  const element = await Mock.mount(m("div", [
    "nothing",
    m("div", [
      m("span", "then nothing"),
    ]),
  ]));
  t.false(Assert.findElementForText(element, "test_text_1"));
  t.false(Assert.findElementForText(element, "test_text_2"));
  t.false(Assert.findElementForText(element, "test_text_3"));
});
