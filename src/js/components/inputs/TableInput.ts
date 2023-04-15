import * as m from "mithril"
import { Changeset } from "../../Changeset"
import {
  PublishedFormQuestionTableSettings,
  PublishedFormQuestionColumnSettings,
} from "../../PublishedForm"

type CellValue = string | null
type TableValue = CellValue[][]

interface Attrs {
  changeset: Changeset
  name: string
  settings: PublishedFormQuestionTableSettings
}

export const TableInput: m.Component<Attrs> = {
  view: ({ attrs: { changeset, name, settings } }) => {
    const tableValue = getValue(changeset, name, settings)
    return m("table.input-table", [
      m(
        "tr.input-table__row",
        settings.columns().map((column) => {
          return m(
            "td.input-table__cell.input-table__cell--header",
            column.title()
          )
        }),
        m(
          "td.input-table__cell.input-table__cell--control",
          m(
            "a.link.color-green",
            {
              onclick: () => {
                addRow(changeset, name, tableValue, settings)
              },
            },
            "add row"
          )
        )
      ),
      tableValue.map((row, rowIndex) => {
        return m(
          "tr.input-table__row",
          settings.columns().map((column, columnIndex) =>
            m("td.input-table__cell.input-table__cell--input", [
              column.dataType() === "sum" &&
                m(".p-2", tableValue[rowIndex][columnIndex]),
              column.dataType() !== "sum" &&
                m("input.input-table__cell__input", {
                  oninput: (event) => {
                    const value = event.target.value
                    setCellValue(
                      changeset,
                      name,
                      settings,
                      tableValue,
                      value,
                      rowIndex,
                      columnIndex
                    )
                  },
                  value: tableValue[rowIndex][columnIndex],
                }),
            ])
          ),
          m(
            "td.input-table__cell.input-table__cell--control",
            m(
              "a.link.color-red",
              {
                onclick: () => {
                  removeRow(changeset, name, tableValue, rowIndex)
                },
              },
              "remove"
            )
          )
        )
      }),
    ])
  },
}

function getValue(
  changeset: Changeset,
  name: string,
  settings: PublishedFormQuestionTableSettings
): TableValue {
  const tableValue = changeset.getValue(name)
  if (!Array.isArray(tableValue) || tableValue.length === 0) {
    return [settings.columns().map(() => null)]
  } else {
    return tableValue.map((rowValue) => {
      if (Array.isArray(rowValue)) {
        return settings.columns().map((column, index) => rowValue[index])
      } else {
        return settings.columns().map(() => null)
      }
    })
  }
}

function setCellValue(
  changeset: Changeset,
  name: string,
  settings: PublishedFormQuestionTableSettings,
  tableValue: TableValue,
  value: CellValue,
  rowIndex: number,
  columnIndex: number
): void {
  tableValue[rowIndex][columnIndex] = formatCellValue(
    value,
    settings.columns()[columnIndex]
  )

  applySums(tableValue, settings)

  changeset.change(name, tableValue)
}

function formatCellValue(
  value = "",
  column: PublishedFormQuestionColumnSettings
): CellValue {
  const splitValue = (value || "").split("")
  let updatedValue = ""
  switch (column.dataType()) {
    case "float":
      for (const index in splitValue) {
        if ("0123456789.-".indexOf(splitValue[index]) !== -1) {
          updatedValue += splitValue[index]
        }
      }
      return updatedValue
    case "integer":
      for (const index in splitValue) {
        if ("0123456789-".indexOf(splitValue[index]) !== -1) {
          updatedValue += splitValue[index]
        }
      }
      return updatedValue
    default:
      return value
  }
}

function addRow(
  changeset: Changeset,
  name: string,
  tableValue: TableValue,
  settings: PublishedFormQuestionTableSettings
): void {
  tableValue.push(settings.columns().map(() => null))
  changeset.change(name, tableValue)
}

function removeRow(
  changeset: Changeset,
  name: string,
  tableValue: TableValue,
  rowIndex: number
): void {
  tableValue.splice(rowIndex, 1)
  changeset.change(name, tableValue)
}

function applySums(
  tableValue: TableValue,
  settings: PublishedFormQuestionTableSettings
): void {
  const columns = settings.columns()

  for (let rowIndex = 0; rowIndex < tableValue.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      if (columns[columnIndex].dataType() === "sum") {
        let sum = 0

        if (columns[columnIndex].dataType() === "sum") {
          for (let c = 0; c < columnIndex; c++) {
            const dataType = columns[c].dataType()
            if (["integer", "float", "sum"].indexOf(dataType) !== -1) {
              sum += parseFloat(tableValue[rowIndex][c]) || 0
            }
          }
        }

        tableValue[rowIndex][columnIndex] = `${sum}`
      }
    }
  }
}
