import * as m from "mithril"
import { Changeset } from "../Changeset"
import { PublishedFormQuestion } from "../PublishedForm"
import * as Questions from "../Questions"
import { block } from "../BEM"

interface Attrs {
  question: PublishedFormQuestion
  previousValues: { [namedID: string]: string | [string] }
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

    return m(".previous-response", [
      m(".color-grey", "Previous response: "),
      m(".previous-response__response", value),
      m(
        ".previous-response__copy",
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
          m("img.previous-response__copy__icon", {
            src: "/images/icons/copy-with-arrow.svg",
            width: 20.9,
            height: 19,
          }),
          m(block("previous-response__tooltip", state.hover && "open"), [
            m(".previous-response__tooltip--value", value),
            m(
              ".previous-response__tooltip--message",
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
