"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Validation_1 = require("../Validation");
ava_1.default("validate succeeds and fails", function (t) {
    var constraints = {
        accept: {
            true: true,
        },
        name: {
            string: true,
            notEmpty: true,
        },
        password: {
            length: { min: 6 },
        },
    };
    t.deepEqual(Validation_1.validate(constraints, { accept: true, name: "Sam", password: "abc123" }), { valid: true, errors: {} });
    t.deepEqual(Validation_1.validate(constraints, { accept: false, name: null, password: "abc" }), {
        valid: false,
        errors: {
            accept: ["required"],
            name: ["must be valid", "can't be empty"],
            password: ["must be at least 6 characters"],
        },
    });
});
ava_1.default("custom validation messages", function (t) {
    var constraints = {
        accept: {
            true: { message: "must be accepted" },
        },
        count: {
            number: { message: "must be a valid count" },
        },
    };
    t.deepEqual(Validation_1.validate(constraints, { accept: false, count: null }), {
        valid: false,
        errors: {
            accept: ["must be accepted"],
            count: ["must be a valid count"],
        },
    });
});
ava_1.default("custom validator", function (t) {
    var constraints = {
        password: {
            length: { min: 6 },
        },
        confirm_password: {
            custom: function (value, values) {
                return values.password !== value ? ["must match password"] : [];
            },
        },
    };
    t.deepEqual(Validation_1.validate(constraints, { password: "abc123", confirm_password: "abc123" }), { valid: true, errors: {} });
    t.deepEqual(Validation_1.validate(constraints, { password: "abc123", confirm_password: "invalid" }), {
        valid: false,
        errors: {
            confirm_password: ["must match password"],
        },
    });
});
//# sourceMappingURL=Validation.test.js.map