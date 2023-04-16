import test from "ava";
import m from "mithril";
import * as Mock from "../../tests/Mock.js";
import {simulateMouseClick} from "../../tests/Events.js";
import {Button} from "../Button.js";

test("renders", async (t) => {
  const button = m(Button, "test content");
  const element = await Mock.mount(button);
  t.is(element.className, "button");
  t.is(element.textContent, "test content");
});

test("renders selector", async (t) => {
  const button = m(Button, {selector: ".test.classes"});
  const element = await Mock.mount(button);
  t.is(element.className, "test classes button");
});

test("renders modifiers", async (t) => {
  const button = m(Button, {modifiers: ["wide", "inverse-primary"]});
  const element = await Mock.mount(button);
  t.is(element.className, "button button--wide button--inverse-primary");
});

test("onClick is called when clicked", async (t) => {
  let clicked = false;
  const button = m(Button, {onClick: () => clicked = true});
  const element = await Mock.mount(button);
  simulateMouseClick(element);
  await new Promise((resolve) => setTimeout(resolve));
  t.is(clicked, true);
});
