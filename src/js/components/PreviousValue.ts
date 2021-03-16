import * as m from "mithril"
import { Changeset } from "../Changeset"
import { PublishedFormQuestion } from "../PublishedForm"
import * as Questions from "../Questions"
import { block } from "../BEM"
import { PreviousValues } from "../PublicFormSubmission"

interface Attrs {
  question: PublishedFormQuestion
  previousValues: PreviousValues
  changeset: Changeset
}

interface State {
  hover: boolean
  copyFailed: boolean
}

export const PreviousValue: m.Component<Attrs, State> = {
  oninit: ({ state }) => {
    state.hover = false
    state.copyFailed = false
  },

  view: ({ attrs: { question, previousValues, changeset }, state }) => {
    const namedId = question.namedID()
    if (!namedId) return null
    let response = previousValues[namedId]
    if (!response) return null
    const value = parseRespone(response)
    if (value == "") return null

    return m(".previous-values", [
      m(".previous-values__title", "Previous response: "),
      m(".previous-values__value", value),
      m(
        ".previous-values__copy",
        {
          onclick: () => {
            state.copyFailed = !Questions.setValue(
              question,
              response,
              changeset
            )
          },
          onmouseenter: () => {
            state.hover = true
          },
          onmouseleave: () => {
            state.hover = false
          },
        },
        [
          "copy",
          m("img.previous-values__copy__icon", {
            src: "/images/icons/copy-with-arrow.svg",
            width: 20.9,
            height: 19,
          }),
          m(block("previous-values__tooltip", state.hover && "open"), [
            m(".previous-values__tooltip__value", value),
            m(
              ".previous-values__tooltip__message",
              state.copyFailed ? "FAILED TO COPY" : "CLICK TO USE"
            ),
          ]),
        ]
      ),
    ])
  },
}

const parseRespone = (response) => {
  if (Array.isArray(response)) {
    return response.join(", ")
  } else if (typeof response == "number") {
    return response.toString()
  }
  return response.replace(",", ", ")
}
