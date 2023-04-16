import m from "mithril";
import * as DateTime from "../../DateTime.js";
import {block} from "../../BEM.js";
import {Changeset} from "../../Changeset.js";
import * as BodyListener from "../../BodyListener.js";

interface Attrs {
  changeset: Changeset;
  name: string;
  [attribute: string]: any;
}

interface State {
  date: Date;
  expand: boolean;
  listenerID: number
}

export const DateInput: m.Component<Attrs, State> = {
  oninit: ({attrs: {changeset, name}, state}) => {
    state.date = dateFromChangeset(changeset, name);
  },

  oncreate: ({state, dom}) => {
    state.listenerID = BodyListener.listen("click", (event) => {
      if (!dom.contains(event.target)) {
        state.expand = false;
        m.redraw();
      }
    });
  },

  onbeforeremove: ({state}) => {
    BodyListener.remove(state.listenerID);
  },

  view: ({
    attrs: {changeset, name, placeholder="Select a Date", ...attrs},
    state,
  }) => {
    const date = state.date;
    return m(block("date-input", state.expand && "active"), {
      onclick: () => {
        if (!state.expand) { state.expand = true; }
      },
    }, [
      displayValue(changeset.getValue(name), placeholder),
      state.expand && m(".date-input__picker-dropdown", [
        m(".date-input__picker-dropdown__title", "Select a Date"),
        m(".date-input__picker-dropdown__pickers", [
          m(Picker, {
            display: date.getDate(),
            change: (amount) => { date.setDate(date.getDate() + amount); },
          }),
          m(Picker, {
            display: DateTime.monthName(date.getMonth()),
            change: (amount) => { date.setMonth(date.getMonth() + amount); },
          }),
          m(Picker, {
            display: date.getFullYear(),
            change: (amount) => {
              date.setFullYear(date.getFullYear() + amount);
            },
          }),
        ]),
        m(".date-input__picker-dropdown__button-row", [
          m(".link.link--primary.margin-right-medium", {
            onclick: () => {
              state.date = dateFromChangeset(changeset, name);
              setTimeout(() => {
                state.expand = false;
                m.redraw();
              });
            },
          }, "Cancel"),
          m(".link.link--primary.margin-right-medium", {
            onclick: () => {
              changeset.change(name, null);
              setTimeout(() => {
                state.expand = false;
                m.redraw();
              });
            },
          }, "Clear"),
          m(".link.link--primary", {
            onclick: () => {
              const value = formatValue(date);
              changeset.change(name, value);
              setTimeout(() => {
                state.expand = false;
                m.redraw();
              });
            },
          }, "Apply"),
        ]),
      ]),
    ]);
  },
};

interface PickerAttrs {
  display: string | number;
  change: (amount: number) => void;
}

const Picker: m.Component<PickerAttrs> = {
  view: ({attrs: {display, change}}) => {
    return m(".date-input__picker-dropdown__picker", [
      m(block("date-input__picker-dropdown__picker__arrow", "up"), {
        onclick: () => { change(1); },
      }),
      m(".date-input__picker-dropdown__picker__value", display),
      m(block("date-input__picker-dropdown__picker__arrow", "down"),
        {onclick: () => { change(-1); }},
      ),
    ]);
  },
};

function displayValue(
  value: string,
  placeholder: string | null,
): m.Children {
  if (value) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return m(".date-input__display-value", [
        DateTime.displayDate(date)
      ]);
    }
  }
  return m(block("date-input__display-value", "placeholder"), placeholder);
}

function formatValue(date: Date): string {
  return zeroPad(date.getFullYear(), 4) + "-" +
    zeroPad(date.getMonth() + 1, 2) + "-" +
    zeroPad(date.getDate(), 2);
}

function zeroPad(value: number, digits: number): string {
  const zeros = "0".repeat(digits);
  return `${zeros}${value}`.slice(-digits);
}

function dateFromChangeset(changeset: Changeset, name: string): Date {
  const dateValue = changeset.getValue(name);
  const date = dateValue ? new Date(dateValue) : new Date();
  return !isNaN(date.getTime()) ? date : new Date();
}
