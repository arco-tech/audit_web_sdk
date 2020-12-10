import * as m from "mithril"
import { Changeset } from "../../Changeset"
import {
  PublishedFormQuestion,
  PublishedFormQuestionTableSettings,
} from "../../PublishedForm"

interface Attrs {
  changeset: Changeset
  name: string
  settings: PublishedFormQuestionTableSettings
}

export const TableInput: m.Component<Attrs> = {
  view: ({attrs: {changeset, name, settings: {columns}}}) => {
    return m(".c-grey", "Not implemented")
  },
}
