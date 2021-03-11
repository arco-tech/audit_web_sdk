import * as m from "mithril"
import { Changeset } from "./Changeset"
import { CheckBoxList } from "./components/inputs/CheckBoxList"
import { DateInput } from "./components/inputs/DateInput"
import { DateRangeInput } from "./components/inputs/DateRangeInput"
import { Input } from "./components/inputs/Input"
import { TextArea } from "./components/inputs/TextArea"
import { InputList } from "./components/inputs/InputList"
import { NumberInput } from "./components/inputs/NumberInput"
import { RadioList } from "./components/inputs/RadioList"
import { GridInput } from "./components/inputs/GridInput"
import { TableInput } from "./components/inputs/TableInput"
import { Selector } from "./components/inputs/Selector"
import {
  PublishedFormGoesTo,
  PublishedFormOption,
  PublishedFormQuestion,
} from "./PublishedForm"
import { log } from "./Log"
import { ErrorMessage } from "./components/ErrorMessage"

interface Attrs {
  name: string
  changeset: Changeset
  [key: string]: any
}

export type RenderFunction = (
  question: PublishedFormQuestion,
  attrs: Attrs
) => m.Children

type SetValueFunction = (
  question: PublishedFormQuestion,
  value: string | string[] | number,
  changeset: Changeset
) => boolean

export interface Type {
  optionGoesTo: boolean
  isComplete: (question: PublishedFormQuestion, value: any) => boolean
  render: RenderFunction
  setValue?: SetValueFunction
}

const setValueText: SetValueFunction = (question, value, changeset) => {
  const formattedValue = Array.isArray(value) ? value.join(", ") : value
  changeset.change(question.id().toString(), formattedValue)
  return true
}

const setValueFloat: SetValueFunction = (question, value, changeset) => {
  let num;
  if (Array.isArray(value)) {
    num = parseFloat(value[0])
  } else {
    num = typeof value == "string" ? parseFloat(value) : value
  }

  if (num) {
    changeset.change(question.id().toString(), num)
    return true
  }
  return false
}

const types: { [type: string]: Type } = {
  text: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "string" && value.trim() !== ""
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(Input, attrs)
    },
    setValue: setValueText,
  },

  paragraph: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "string" && value.trim() !== ""
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(TextArea, attrs)
    },
    setValue: setValueText,
  },

  multi_text: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, valueList: any) => {
      if (Array.isArray(valueList)) {
        const validValues = valueList.map((value) => {
          return typeof value === "string" && value.trim() !== ""
        })
        return validValues.indexOf(true) !== -1
      } else {
        return false
      }
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(InputList, attrs)
    },
    setValue: (question, values, changeset) => {
      const list = typeof values == "string" ? values.split(",") : values
      if (list) {
        changeset.change(question.id().toString(), list)
        return true
      }
      return false
    },
  },

  number: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "number"
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(NumberInput, attrs)
    },
    setValue: setValueFloat,
  },

  percentage: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "number"
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(NumberInput, attrs)
    },
    setValue: setValueFloat,
  },

  button: {
    optionGoesTo: true,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "number" && findOption(question, value) !== null
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(RadioList, { options: buildOptions(question), ...attrs })
    },
    setValue: (question, value, changeset) => {
      const option = question.options().find((option) => {
        return option.label() === value
      })
      if (option) {
        changeset.change(question.id().toString(), option.id())
        return true
      }
      return false
    },
  },

  multi_button: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => true,
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(CheckBoxList, { options: buildOptions(question), ...attrs })
    },
    setValue: (question, values, changeset) => {
      if (typeof values == "number") {
        return false
      }
      const list = typeof values == "string" ? values.split(",") : values
      const ids = (list || []).reduce((acc, value) => {
        const option = question.options().find((option) => {
          return option.label() === value
        })
        option && acc.push(option.id())
        return acc
      }, [])
      changeset.change(question.id().toString(), ids)
      return ids.length != 0
    },
  },

  dropdown: {
    optionGoesTo: true,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "number" && findOption(question, value) !== null
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(Selector, {
        options: buildOptions(question),
        integerValues: true,
        ...attrs,
      })
    },
    setValue: (question, value, changeset) => {
      const option = question.options().find((option) => {
        return option.label() === value
      })
      if (option) {
        changeset.change(question.id().toString(), option.id().toString())
        return true
      }
      return false
    },
  },

  date: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return value != null && !isNaN(new Date(value).getTime())
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(DateInput, attrs)
    },
    setValue: (question, value, changeset) => {
      const date =
        typeof value == "string" ? new Date(value) : new Date(value[0])
      if (date.toString() != "Invalid Date") {
        changeset.change(question.id().toString(), date)
        return true
      }
      return false
    },
  },

  date_range: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return (
        value != null &&
        typeof value === "object" &&
        value.from != null &&
        !isNaN(new Date(value.from).getTime())
      )
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(DateRangeInput, attrs)
    },
    setValue: (question, values, changeset) => {
      if (typeof(values) == "number") {
        return false
      }
      const list = typeof values == "string" ? values.split(",") : values
      const [from, to] = list.map((date) => new Date(date))
      if (
        from.toString() != "Invalid Date" &&
        to.toString() != "Invalid Date"
      ) {
        changeset.change(question.id().toString(), { from, to })
        return true
      }
      return false
    },
  },

  grid: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      if (!Array.isArray(value)) {
        return false
      }
      for (let rowIndex in value) {
        for (let columnIndex in value[rowIndex]) {
          if (
            value[rowIndex][columnIndex] ||
            value[rowIndex][columnIndex] === 0
          ) {
            return true
          }
        }
      }
      return false
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      const settings = question.metadata().gridSettings()
      if (settings) {
        return m(GridInput, { ...attrs, settings })
      } else {
        return m(ErrorMessage, { error: "invalid grid settings" })
      }
    },
  },

  table: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      if (!Array.isArray(value)) {
        return false
      }
      for (let rowIndex in value) {
        for (let columnIndex in value[rowIndex]) {
          if (
            value[rowIndex][columnIndex] ||
            value[rowIndex][columnIndex] === 0
          ) {
            return true
          }
        }
      }
      return false
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      const settings = question.metadata().tableSettings()
      if (settings) {
        return m(TableInput, { ...attrs, settings })
      } else {
        return m(ErrorMessage, { error: "invalid table settings" })
      }
    },
  },
}

const fallbackType = {
  optionGoesTo: false,
  isComplete: () => false,
  render: () => null,
}

function questionType(question: PublishedFormQuestion): Type {
  return types[question.type()] || fallbackType
}

export function goesTo(
  question: PublishedFormQuestion,
  value: any
): PublishedFormGoesTo | null {
  if (questionType(question)) {
    if (questionType(question).optionGoesTo) {
      const option = findOption(question, value)
      return option ? option.goesTo() : null
    } else {
      return question.goesTo()
    }
  } else {
    log("error", ["Question type isn't defined", question.type()])
  }
}

export function isComplete(
  question: PublishedFormQuestion,
  value: any
): boolean {
  if (questionType(question)) {
    return questionType(question).isComplete(question, value)
  } else {
    log("error", ["Question type isn't defined", question.type()])
  }
}

export function findOption(
  question: PublishedFormQuestion,
  id: number
): PublishedFormOption | null {
  return (
    question.options().find((option: PublishedFormOption) => {
      return option.id() === id
    }) || null
  )
}

export function render(
  question: PublishedFormQuestion,
  attrs: Attrs
): m.Children | null {
  if (questionType(question)) {
    return questionType(question).render(question, attrs)
  } else {
    log("error", ["Question type isn't defined", question.type()])
    return null
  }
}

export function setValue(
  question: PublishedFormQuestion,
  value: string | string[],
  changeset: Changeset
): m.Children | null {
  if (questionType(question)) {
    return questionType(question).setValue(question, value, changeset)
  } else {
    log("error", ["Question type isn't defined", question.type()])
    return null
  }
}

export function overrideRender(
  questionType: string,
  render: RenderFunction
): void {
  if (types[questionType]) {
    types[questionType].render = render
  } else {
    throw new Error(`Question type '${questionType} doesn't exist`)
  }
}

function buildOptions(
  question: PublishedFormQuestion
): Array<{ label: string; value: number }> {
  return question.options().map((option) => {
    return { label: option.label(), value: option.id() }
  })
}
