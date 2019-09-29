import test from "ava";
import * as m from "mithril";
import * as Mock from "../../../tests/Mock";
import {Changeset} from "../../../Changeset";
import {Input} from "../Input";
import {simulateInput} from "../../../tests/Events";

test("renders", async (t) => {
  const changeset = new Changeset({property: "test value"});
  const input = m(Input, {
    selector: ".custom-class",
    changeset: changeset,
    name: "property",
    placeholder: "custom attribute",
  });
  const element = await Mock.mount(input) as HTMLInputElement;
  t.is(element.tagName, "INPUT");
  t.is(element.className, "custom-class");
  t.is(element.value, "test value");
  t.is(element.placeholder, "custom attribute");
});

test("updates changeset on input", async (t) => {
  const changeset = new Changeset({property: "original value"});
  const input = m(Input, {changeset: changeset, name: "property"});
  const element = await Mock.mount(input) as HTMLInputElement;
  simulateInput(element, "updated value");
  t.is(changeset.getValue("property"), "updated value");
});
