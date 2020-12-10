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

export type RenderFunction =
  (question: PublishedFormQuestion, attrs: Attrs) => m.Children

export interface Type {
  optionGoesTo: boolean
  isComplete: (question: PublishedFormQuestion, value: any) => boolean
  render: RenderFunction
}

const types: {[type: string]: Type} = {
  text: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "string" && value.trim() !== ""
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(Input, attrs)
    },
  },

  paragraph: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "string" && value.trim() !== ""
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(TextArea, attrs)
    },
  },

  multi_text: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, valueList: any) => {
      if (Array.isArray(valueList)) {
        const validValues =
          valueList.map((value) => {
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
  },

  number: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "number"
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(NumberInput, attrs)
    },
  },

  percentage: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "number"
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(NumberInput, attrs)
    },
  },

  button: {
    optionGoesTo: true,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return typeof value === "number" && findOption(question, value) !== null
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(RadioList, {options: buildOptions(question), ...attrs})
    },
  },

  multi_button: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => true,
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(CheckBoxList, {options: buildOptions(question), ...attrs})
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
  },

  date: {
    optionGoesTo: false,
    isComplete: (question: PublishedFormQuestion, value: any) => {
      return value != null && !isNaN(new Date(value).getTime())
    },
    render: (question: PublishedFormQuestion, attrs: Attrs): m.Children => {
      return m(DateInput, attrs)
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
        return m(GridInput, {...attrs, settings})
      } else {
        return m(ErrorMessage, {error: "invalid grid settings"})
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
        return m(TableInput, {...attrs, settings})
      } else {
        return m(ErrorMessage, {error: "invalid table settings"})
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
  value: any,
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
  value: any,
): boolean {
  if (questionType(question)) {
    return questionType(question).isComplete(question, value)
  } else {
    log("error", ["Question type isn't defined", question.type()])
  }
}

export function findOption(
  question: PublishedFormQuestion,
  id: number,
): PublishedFormOption | null {
  return question.options().find((option: PublishedFormOption) => {
    return option.id() === id
  }) || null
}

export function render(
  question: PublishedFormQuestion,
  attrs: Attrs,
): m.Children | null {
  if (questionType(question)) {
    return questionType(question).render(question, attrs)
  } else {
    log("error", ["Question type isn't defined", question.type()])
    return null
  }
}

export function overrideRender(
  questionType: string,
  render: RenderFunction,
): void {
  if (types[questionType]) {
    types[questionType].render = render
  } else {
    throw new Error(`Question type '${questionType} doesn't exist`)
  }
}

function buildOptions(
  question: PublishedFormQuestion,
): Array<{label: string, value: number}> {
  return question.options().map((option) => {
    return {label: option.label(), value: option.id()}
  })
}
