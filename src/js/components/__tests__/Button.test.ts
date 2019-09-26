import test from "ava";
import * as m from "mithril";
import * as Mock from "../../test_helpers/Mock";
import {Button} from "../Button";

test("renders", async (t) => {
  const button = m(Button, {modifiers: "wide"});
  const element = (await Mock.mount(button));
  t.is(element.className, "button button--wide");
});
