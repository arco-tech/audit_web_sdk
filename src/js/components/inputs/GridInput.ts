import * as m from "mithril"
import { Changeset } from "../../Changeset"
import {
  PublishedFormQuestion,
  PublishedFormQuestionGridSettings,
} from "../../PublishedForm"

interface Attrs {
  changeset: Changeset
  name: string
  settings: PublishedFormQuestionGridSettings
}

export const GridInput: m.Component<Attrs> = {
  view: ({attrs: {changeset, name, settings: {rows, columns}}}) => {
    return m(".c-grey", "Not implemented")
  },
}
