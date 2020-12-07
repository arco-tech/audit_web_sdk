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
    return m("table.grid-input-table", [
      m("tr.grid-input-table__row", [
        m("td.grid-input-table__cell"),
        columns.map((column) => {
          return m("td.grid-input-table__cell", column.title)
        }),
      ]),
      rows.map((row) => {
        return [
          m("td", row.title),
          columns.map((column) => {
            return m("td.grid-input-table__cell", [
              "Test"
            ])
          }),
        ]
      }),
    ])
  },
}
