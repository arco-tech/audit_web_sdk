import test from "ava";
import { JSDOM } from 'jsdom';
import { listen, remove } from "../BodyListener.js";
test("listen and remove", (t) => {
    const dom = new JSDOM('<div id="my-element-id" />');
    global.document = dom.window.document;
    let clickCount = 0;
    const id = listen("click", () => { clickCount++; });
    t.is(clickCount, 0);
    document.body.click();
    t.is(clickCount, 1);
    remove(id);
    document.body.click();
    t.is(clickCount, 1);
});
//# sourceMappingURL=BodyListener.test.js.map