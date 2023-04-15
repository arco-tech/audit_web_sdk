import test from "ava";
import { validate } from "../Validation.js";
test("validate succeeds and fails", (t) => {
    const constraints = {
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
    t.deepEqual(validate(constraints, { accept: true, name: "Sam", password: "abc123" }), { valid: true, errors: {} });
    t.deepEqual(validate(constraints, { accept: false, name: null, password: "abc" }), {
        valid: false,
        errors: {
            accept: ["required"],
            name: ["must be valid", "can't be empty"],
            password: ["must be at least 6 characters"],
        },
    });
});
test("custom validation messages", (t) => {
    const constraints = {
        accept: {
            true: { message: "must be accepted" },
        },
        count: {
            number: { message: "must be a valid count" },
        },
    };
    t.deepEqual(validate(constraints, { accept: false, count: null }), {
        valid: false,
        errors: {
            accept: ["must be accepted"],
            count: ["must be a valid count"],
        },
    });
});
test("custom validator", (t) => {
    const constraints = {
        password: {
            length: { min: 6 },
        },
        confirm_password: {
            custom: (value, values) => {
                return values.password !== value ? ["must match password"] : [];
            },
        },
    };
    t.deepEqual(validate(constraints, { password: "abc123", confirm_password: "abc123" }), { valid: true, errors: {} });
    t.deepEqual(validate(constraints, { password: "abc123", confirm_password: "invalid" }), {
        valid: false,
        errors: {
            confirm_password: ["must match password"],
        },
    });
});
//# sourceMappingURL=Validation.test.js.map