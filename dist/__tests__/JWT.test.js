"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var jsdom_1 = require("jsdom");
var JWT_1 = require("../JWT");
function toBase64(content) {
    return Buffer.from(content).toString("base64");
}
function mockToken(payload) {
    var encodedHeader = toBase64(JSON.stringify({
        alg: "HS512",
        typ: "JWT",
    }));
    var encodedPayload = toBase64(JSON.stringify(payload));
    return "".concat(encodedHeader, ".").concat(encodedPayload, ".abc123");
}
(0, ava_1.default)("decodePayload", function (t) {
    var dom = new jsdom_1.JSDOM('<div id="my-element-id" />');
    global.window = dom.window;
    var token = mockToken({ test: "value" });
    t.deepEqual((0, JWT_1.decodePayload)(token), { test: "value" });
});
(0, ava_1.default)("isValid", function (t) {
    var dom = new jsdom_1.JSDOM('<div id="my-element-id" />');
    global.window = dom.window;
    var expiredTime = Math.floor(new Date().getTime() / 1000) - 1;
    var expiredToken = mockToken({ exp: expiredTime });
    t.is((0, JWT_1.isValid)(expiredToken), false);
    var validTime = Math.ceil(new Date().getTime() / 1000) + 1;
    var validToken = mockToken({ exp: validTime });
    t.is((0, JWT_1.isValid)(validToken), true);
});
//# sourceMappingURL=JWT.test.js.map