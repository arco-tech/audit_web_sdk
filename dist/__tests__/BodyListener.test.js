"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var jsdom_1 = require("jsdom");
var BodyListener_1 = require("../BodyListener");
(0, ava_1.default)("listen and remove", function (t) {
    var dom = new jsdom_1.JSDOM('<div id="my-element-id" />');
    global.document = dom.window.document;
    var clickCount = 0;
    var id = (0, BodyListener_1.listen)("click", function () { clickCount++; });
    t.is(clickCount, 0);
    document.body.click();
    t.is(clickCount, 1);
    (0, BodyListener_1.remove)(id);
    document.body.click();
    t.is(clickCount, 1);
});
//# sourceMappingURL=BodyListener.test.js.map