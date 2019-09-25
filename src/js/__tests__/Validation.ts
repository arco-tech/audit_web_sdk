import test from "ava";
import {validate} from "../Validation";

test("validate succeeds and fails", (t) => {
  const constraints = {
    accept: {
      true: true,
    },
    name: {
      string: true,
      notEmpty: true,
    },
  };
  t.deepEqual(validate(constraints, {accept: true, name: "Sam"}), {
    valid: true,
    errors: {},
  });
  t.deepEqual(validate(constraints, {accept: false, name: null}), {
    valid: false,
    errors: {
      accept: ["required"],
      name: ["must be valid", "can't be empty"],
    },
  });
});

test("custom validation messages", (t) => {
  const constraints = {
    accept: {
      true: {message: "must be accepted"},
    },
    count: {
      number: {message: "must be a valid count"},
    },
  };
  t.deepEqual(validate(constraints, {accept: false, count: null}), {
    valid: false,
    errors: {
      accept: ["must be accepted"],
      count: ["must be a valid count"],
    },
  });
});
