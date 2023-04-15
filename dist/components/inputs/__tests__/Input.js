import test from "ava";
import * as m from "mithril";
import * as Mock from "../../../tests/Mock.js";
import { Changeset } from "../../../Changeset.js";
import { Input } from "../Input.js";
import { simulateInput } from "../../../tests/Events.js";
test("renders", async (t) => {
    const changeset = new Changeset({ property: "test value" });
    const input = m(Input, {
        selector: ".custom-class",
        changeset: changeset,
        name: "property",
        placeholder: "custom attribute",
    });
    const element = await Mock.mount(input);
    t.is(element.tagName, "INPUT");
    t.is(element.className, "custom-class");
    t.is(element.value, "test value");
    t.is(element.placeholder, "custom attribute");
});
test("updates changeset on input", async (t) => {
    const changeset = new Changeset({ property: "original value" });
    const input = m(Input, { changeset: changeset, name: "property" });
    const element = await Mock.mount(input);
    simulateInput(element, "updated value");
    t.is(changeset.getValue("property"), "updated value");
});
//# sourceMappingURL=Input.js.map