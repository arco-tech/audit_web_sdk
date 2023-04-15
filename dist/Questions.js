import * as m from "mithril";
import { CheckBoxList } from "./components/inputs/CheckBoxList.js";
import { DateInput } from "./components/inputs/DateInput.js";
import { DateRangeInput } from "./components/inputs/DateRangeInput.js";
import { Input } from "./components/inputs/Input.js";
import { TextArea } from "./components/inputs/TextArea.js";
import { InputList } from "./components/inputs/InputList.js";
import { NumberInput } from "./components/inputs/NumberInput.js";
import { RadioList } from "./components/inputs/RadioList.js";
import { GridInput } from "./components/inputs/GridInput.js";
import { TableInput } from "./components/inputs/TableInput.js";
import { Selector } from "./components/inputs/Selector.js";
import { FileUploadInput } from "./components/inputs/FileUploadInput.js";
import { log } from "./Log.js";
import { ErrorMessage } from "./components/ErrorMessage.js";
const setValueText = (question, value, changeset) => {
    const formattedValue = Array.isArray(value) ? value.join(", ") : value;
    changeset.change(question.id().toString(), formattedValue);
    return true;
};
const setValueFloat = (question, value, changeset) => {
    let num;
    if (Array.isArray(value)) {
        num = parseFloat(value[0]);
    }
    else {
        num = typeof value == "string" ? parseFloat(value) : value;
    }
    if (num) {
        changeset.change(question.id().toString(), num);
        return true;
    }
    return false;
};
const types = {
    text: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            return typeof value === "string" && value.trim() !== "";
        },
        render: (question, attrs) => {
            return m(Input, attrs);
        },
        setValue: setValueText,
    },
    paragraph: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            return typeof value === "string" && value.trim() !== "";
        },
        render: (question, attrs) => {
            return m(TextArea, attrs);
        },
        setValue: setValueText,
    },
    multi_text: {
        optionGoesTo: false,
        isComplete: (question, valueList) => {
            if (Array.isArray(valueList)) {
                const validValues = valueList.map((value) => {
                    return typeof value === "string" && value.trim() !== "";
                });
                return validValues.indexOf(true) !== -1;
            }
            else {
                return false;
            }
        },
        render: (question, attrs) => {
            return m(InputList, attrs);
        },
        setValue: (question, values, changeset) => {
            const list = typeof values == "string" ? values.split(",") : values;
            if (Array.isArray(list)) {
                changeset.change(question.id().toString(), [...list]);
                return true;
            }
            return false;
        },
    },
    number: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            return typeof value === "number";
        },
        render: (question, attrs) => {
            return m(NumberInput, attrs);
        },
        setValue: setValueFloat,
    },
    percentage: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            return typeof value === "number";
        },
        render: (question, attrs) => {
            return m(NumberInput, attrs);
        },
        setValue: setValueFloat,
    },
    button: {
        optionGoesTo: true,
        isComplete: (question, value) => {
            return typeof value === "number" && findOption(question, value) !== null;
        },
        render: (question, attrs) => {
            return m(RadioList, { options: buildOptions(question), ...attrs });
        },
        setValue: (question, value, changeset) => {
            const option = question.options().find((option) => {
                return option.label() === value;
            });
            if (option) {
                changeset.change(question.id().toString(), option.id());
                return true;
            }
            return false;
        },
    },
    multi_button: {
        optionGoesTo: false,
        isComplete: (question, value) => true,
        render: (question, attrs) => {
            return m(CheckBoxList, { options: buildOptions(question), ...attrs });
        },
        setValue: (question, values, changeset) => {
            if (typeof values == "number") {
                return false;
            }
            const list = typeof values == "string" ? values.split(",") : values;
            const ids = (list || []).reduce((acc, value) => {
                const option = question.options().find((option) => {
                    return option.label() === value;
                });
                option && acc.push(option.id());
                return acc;
            }, []);
            changeset.change(question.id().toString(), ids);
            return ids.length != 0;
        },
    },
    dropdown: {
        optionGoesTo: true,
        isComplete: (question, value) => {
            return typeof value === "number" && findOption(question, value) !== null;
        },
        render: (question, attrs) => {
            return m(Selector, {
                options: buildOptions(question),
                integerValues: true,
                ...attrs,
            });
        },
        setValue: (question, value, changeset) => {
            const option = question.options().find((option) => {
                return option.label() === value;
            });
            if (option) {
                changeset.change(question.id().toString(), option.id().toString());
                return true;
            }
            return false;
        },
    },
    date: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            return value != null && !isNaN(new Date(value).getTime());
        },
        render: (question, attrs) => {
            return m(DateInput, attrs);
        },
        setValue: (question, value, changeset) => {
            const date = typeof value == "string" ? new Date(value) : new Date(value[0]);
            if (date.toString() != "Invalid Date") {
                changeset.change(question.id().toString(), date);
                return true;
            }
            return false;
        },
    },
    date_range: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            return (value != null &&
                typeof value === "object" &&
                value.from != null &&
                !isNaN(new Date(value.from).getTime()));
        },
        render: (question, attrs) => {
            return m(DateRangeInput, attrs);
        },
        setValue: (question, values, changeset) => {
            if (typeof values == "number") {
                return false;
            }
            const list = typeof values == "string" ? values.split(",") : values;
            const [from, to] = list.map((date) => new Date(date));
            if (from.toString() != "Invalid Date" &&
                to.toString() != "Invalid Date") {
                changeset.change(question.id().toString(), { from, to });
                return true;
            }
            return false;
        },
    },
    grid: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            if (!Array.isArray(value)) {
                return false;
            }
            for (const rowIndex in value) {
                for (const columnIndex in value[rowIndex]) {
                    if (value[rowIndex][columnIndex] ||
                        value[rowIndex][columnIndex] === 0) {
                        return true;
                    }
                }
            }
            return false;
        },
        render: (question, attrs) => {
            const settings = question.metadata().gridSettings();
            if (settings) {
                return m(GridInput, { ...attrs, settings });
            }
            else {
                return m(ErrorMessage, { error: "invalid grid settings" });
            }
        },
        setValue: (question, values, changeset) => {
            if (Array.isArray(values) &&
                values[0].length > 0 &&
                Array.isArray(values[0])) {
                changeset.change(question.id().toString(), values);
                return true;
            }
            return false;
        },
    },
    table: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            if (!Array.isArray(value)) {
                return false;
            }
            for (const rowIndex in value) {
                for (const columnIndex in value[rowIndex]) {
                    if (value[rowIndex][columnIndex] ||
                        value[rowIndex][columnIndex] === 0) {
                        return true;
                    }
                }
            }
            return false;
        },
        render: (question, attrs) => {
            const settings = question.metadata().tableSettings();
            if (settings) {
                return m(TableInput, { ...attrs, settings });
            }
            else {
                return m(ErrorMessage, { error: "invalid table settings" });
            }
        },
        setValue: (question, values, changeset) => {
            if (Array.isArray(values) &&
                values[0].length > 0 &&
                Array.isArray(values[0])) {
                changeset.change(question.id().toString(), values);
                return true;
            }
            return false;
        },
    },
    files: {
        optionGoesTo: false,
        isComplete: (question, value) => {
            return Array.isArray(value) && value.length > 0;
        },
        render: (question, attrs) => {
            return m(FileUploadInput, { questionID: question.id(), ...attrs });
        },
    },
};
const fallbackType = {
    optionGoesTo: false,
    isComplete: () => false,
    render: () => null,
};
function questionType(question) {
    return types[question.type()] || fallbackType;
}
export function goesTo(question, value) {
    if (questionType(question)) {
        if (questionType(question).optionGoesTo) {
            const option = findOption(question, value);
            return option ? option.goesTo() : null;
        }
        else {
            return question.goesTo();
        }
    }
    else {
        log("error", ["Question type isn't defined", question.type()]);
    }
}
export function isComplete(question, value) {
    if (questionType(question)) {
        return questionType(question).isComplete(question, value);
    }
    else {
        log("error", ["Question type isn't defined", question.type()]);
    }
}
export function findOption(question, id) {
    return (question.options().find((option) => {
        return option.id() === id;
    }) || null);
}
export function render(question, attrs) {
    if (questionType(question)) {
        return questionType(question).render(question, attrs);
    }
    else {
        log("error", ["Question type isn't defined", question.type()]);
        return null;
    }
}
export function setValue(question, value, changeset) {
    if (questionType(question)) {
        return questionType(question).setValue(question, value, changeset);
    }
    else {
        log("error", ["Question type isn't defined", question.type()]);
        return null;
    }
}
export function overrideRender(questionType, render) {
    if (types[questionType]) {
        types[questionType].render = render;
    }
    else {
        throw new Error(`Question type '${questionType} doesn't exist`);
    }
}
function buildOptions(question) {
    return question.options().map((option) => {
        return { label: option.label(), value: option.id() };
    });
}
//# sourceMappingURL=Questions.js.map