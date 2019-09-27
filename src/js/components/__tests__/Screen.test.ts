import test from "ava";
import * as m from "mithril";
import * as Mock from "../../test_helpers/Mock";
import {Screen} from "../Screen";

test("renders", async (t) => {
  const screen = m(Screen, "test content");
  const element = await Mock.mount(screen);
  t.is(element.className, "screen");
  t.is(element.children.item(0).className, "header");
  t.is(element.children.item(1).className, "screen__content");
  t.is(element.children.item(1).textContent, "test content");
  t.is(element.children.item(2).className, "footer");
});

test("renders selector", async (t) => {
  const screen = m(Screen, {selector: ".test.classes"});
  const element = await Mock.mount(screen);
  t.is(element.className, "screen test classes");
});
