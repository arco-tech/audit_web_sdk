interface Options {
  message?: string;
}

type OptionsOrBoolean = Options | boolean;

type CustomConstraint = (value: any) => string[];

interface AttributeConstraints {
  true?: OptionsOrBoolean;
  string?: OptionsOrBoolean;
  number?: OptionsOrBoolean;
  notEmpty?: OptionsOrBoolean;
  custom?: CustomConstraint | boolean;
}

export interface Constraints {
  [attribute: string]: AttributeConstraints;
}

export interface ValidationResult {
  valid: boolean;
  errors: {[attribute: string]: string[]};
}

interface ConstraintValidators {
  [constraint: string]:
    (
      value: any,
      options: OptionsOrBoolean | CustomConstraint,
    ) => string[];
}

export const constraintValidators: ConstraintValidators = {
  true: (value: any, options: OptionsOrBoolean) => {
    if (value !== true && options) {
      return [message(options, "required")];
    } else {
      return [];
    }
  },

  string: (value: any, options: OptionsOrBoolean) => {
    return typeof value === "string" ? [] : [message(options, "must be valid")];
  },

  custom: (value: any, constraint: CustomConstraint | boolean) => {
    if (typeof constraint === "function") {
      return constraint(value);
    } else {
      return constraint ? [] : ["must be valid"];
    }
  },

  number: (value: any, options: OptionsOrBoolean) => {
    return typeof value === "number" ? [] : [message(options, "must be valid")];
  },

  notEmpty: (value: any, options: OptionsOrBoolean) => {
    const isEmpty =
      (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim().length === 0) ||
        (
          typeof value === "object" &&
          Array.isArray(value) &&
          value.length === 0
        ) ||
        (
          typeof value === "object" &&
          Array.isArray(value) === false &&
          Object.keys(value).length === 0
        )
      );

    if (isEmpty === true && options) {
      return [message(options, "can't be empty")];
    } else {
      return [];
    }
  },
};

export function validate(
  constraints: Constraints,
  attributes: {[attribute: string]: any},
): ValidationResult {
  let valid = true;
  const errors: {[attribute: string]: string[]} = {};
  Object.keys(constraints).forEach((attribute: string) => {
    Object.keys(constraints[attribute]).forEach((constraint: string) => {
      const value = attributes[attribute];
      const options = constraints[attribute][constraint];
      const validator = constraintValidators[constraint];
      const validatorErrors = validator(value, options);
      if (validatorErrors.length > 0) {
        if (errors[attribute] === undefined) { errors[attribute] = []; }
        errors[attribute] = errors[attribute].concat(validatorErrors);
      }
    });
    if (errors[attribute] !== undefined) { valid = false; }
  });
  return {valid, errors};
}

function message(options: OptionsOrBoolean, defaultMessage: string): string {
  if (typeof options === "object" && options.message) {
    return options.message;
  } else {
    return defaultMessage;
  }
}
