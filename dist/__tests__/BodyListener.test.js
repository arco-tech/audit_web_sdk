"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var BodyListener_1 = require("../BodyListener");
ava_1.default("listen and remove", function (t) {
    var clickCount = 0;
    var id = BodyListener_1.listen("click", function () { clickCount++; });
    t.is(clickCount, 0);
    document.body.click();
    t.is(clickCount, 1);
    BodyListener_1.remove(id);
    document.body.click();
    t.is(clickCount, 1);
});
//# sourceMappingURL=BodyListener.test.js.map