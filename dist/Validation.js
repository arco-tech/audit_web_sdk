"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constraintValidators = {
    true: function (value, options) {
        if (value !== true && options) {
            return [message(options, "required")];
        }
        else {
            return [];
        }
    },
    string: function (value, options) {
        return typeof value === "string" ? [] : [message(options, "must be valid")];
    },
    length: function (value, options) {
        if (typeof options === "object" && typeof value === "string") {
            if (options.hasOwnProperty("min") && options.min > value.length) {
                return ["must be at least " + options.min + " characters"];
            }
            else if (options.hasOwnProperty("max") && options.max < value.length) {
                return ["must be at most " + options.max + " characters"];
            }
        }
        return [];
    },
    custom: function (value, constraint, values) {
        if (typeof constraint === "function") {
            return constraint(value, values);
        }
        else {
            return constraint ? [] : ["must be valid"];
        }
    },
    number: function (value, options) {
        return typeof value === "number" ? [] : [message(options, "must be valid")];
    },
    notEmpty: function (value, options) {
        var isEmpty = (value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim().length === 0) ||
            (typeof value === "object" &&
                Array.isArray(value) &&
                value.length === 0) ||
            (typeof value === "object" &&
                Array.isArray(value) === false &&
                Object.keys(value).length === 0));
        if (isEmpty === true && options) {
            return [message(options, "can't be empty")];
        }
        else {
            return [];
        }
    },
};
function validate(constraints, attributes) {
    var valid = true;
    var errors = {};
    Object.keys(constraints).forEach(function (attribute) {
        Object.keys(constraints[attribute]).forEach(function (constraint) {
            var value = attributes[attribute];
            var options = constraints[attribute][constraint];
            var validator = exports.constraintValidators[constraint];
            var validatorErrors = validator(value, options, attributes);
            if (validatorErrors && validatorErrors.length > 0) {
                if (errors[attribute] === undefined) {
                    errors[attribute] = [];
                }
                errors[attribute] = errors[attribute].concat(validatorErrors);
            }
        });
        if (errors[attribute] !== undefined) {
            valid = false;
        }
    });
    return { valid: valid, errors: errors };
}
exports.validate = validate;
function message(options, defaultMessage) {
    if (typeof options === "object" && options.message) {
        return options.message;
    }
    else {
        return defaultMessage;
    }
}
//# sourceMappingURL=Validation.js.map