export const constraintValidators = {
    true: (value, options) => {
        if (value !== true && options) {
            return [message(options, "required")];
        }
        else {
            return [];
        }
    },
    string: (value, options) => {
        return typeof value === "string" ? [] : [message(options, "must be valid")];
    },
    length: (value, options) => {
        if (typeof options === "object" && typeof value === "string") {
            if (options.hasOwnProperty("min") && options.min > value.length) {
                return [`must be at least ${options.min} characters`];
            }
            else if (options.hasOwnProperty("max") && options.max < value.length) {
                return [`must be at most ${options.max} characters`];
            }
        }
        return [];
    },
    custom: (value, constraint, values) => {
        if (typeof constraint === "function") {
            return constraint(value, values);
        }
        else {
            return constraint ? [] : ["must be valid"];
        }
    },
    number: (value, options) => {
        return typeof value === "number" ? [] : [message(options, "must be valid")];
    },
    notEmpty: (value, options) => {
        const isEmpty = (value === null ||
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
export function validate(constraints, attributes) {
    let valid = true;
    const errors = {};
    Object.keys(constraints).forEach((attribute) => {
        Object.keys(constraints[attribute]).forEach((constraint) => {
            const value = attributes[attribute];
            const options = constraints[attribute][constraint];
            const validator = constraintValidators[constraint];
            const validatorErrors = validator(value, options, attributes);
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
    return { valid, errors };
}
function message(options, defaultMessage) {
    if (typeof options === "object" && options.message) {
        return options.message;
    }
    else {
        return defaultMessage;
    }
}
//# sourceMappingURL=Validation.js.map