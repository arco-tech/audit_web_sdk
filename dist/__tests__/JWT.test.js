"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
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
    return encodedHeader + "." + encodedPayload + ".abc123";
}
ava_1.default("decodePayload", function (t) {
    var token = mockToken({ test: "value" });
    t.deepEqual(JWT_1.decodePayload(token), { test: "value" });
});
ava_1.default("isValid", function (t) {
    var expiredTime = Math.floor(new Date().getTime() / 1000) - 1;
    var expiredToken = mockToken({ exp: expiredTime });
    t.is(JWT_1.isValid(expiredToken), false);
    var validTime = Math.ceil(new Date().getTime() / 1000) + 1;
    var validToken = mockToken({ exp: validTime });
    t.is(JWT_1.isValid(validToken), true);
});
//# sourceMappingURL=JWT.test.js.map