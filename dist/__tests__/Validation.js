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
    };
    t.deepEqual(Validation_1.validate(constraints, { accept: true, name: "Sam" }), {
        valid: true,
        errors: {},
    });
    t.deepEqual(Validation_1.validate(constraints, { accept: false, name: null }), {
        valid: false,
        errors: {
            accept: ["required"],
            name: ["must be valid", "can't be empty"],
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
//# sourceMappingURL=Validation.js.map