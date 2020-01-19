import test from "ava";
import {listen, remove} from "../BodyListener";

test("listen and remove", (t) => {
  let clickCount = 0;
  const id = listen("click", () => { clickCount++; });
  t.is(clickCount, 0);
  document.body.click();
  t.is(clickCount, 1);
  remove(id);
  document.body.click();
  t.is(clickCount, 1);
});
