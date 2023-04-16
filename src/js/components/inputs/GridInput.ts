import m from "mithril"
import { Changeset } from "../../Changeset.js"
import {
  PublishedFormQuestionGridSettings,
  PublishedFormQuestionColumnSettings,
} from "../../PublishedForm.js"

type CellValue = string | null
type GridValue = CellValue[][]

interface Attrs {
  changeset: Changeset
  name: string
  settings: PublishedFormQuestionGridSettings
}

export const GridInput: m.Component<Attrs> = {
  view: ({ attrs: { changeset, name, settings } }) => {
    return m(
      "table.input-table",
      m("tr.input-table__row", [
        m("td.input-table__cell.input-table__cell--header"),
        settings
          .columns()
          .map((column) =>
            m("td.input-table__cell.input-table__cell--header", column.title())
          ),
      ]),
      settings.rows().map((row, rowIndex) => {
        return m("tr.input-table__row", [
          m("td.input-table__cell.input-table__cell--header", row.title()),
          settings.columns().map((column, columnIndex) => {
            const isSum = row.dataType() === "sum" || column.dataType() === "sum"

            return m("td.input-table__cell.input-table__cell--input", [
              isSum &&
                m(
                  ".p-2",
                  getCellValue(changeset.getValue(name), rowIndex, columnIndex)
                ),
              !isSum &&
                m("input.input-table__cell__input", {
                  oninput: (event) => {
                    const value = event.target.value
                    setCellValue(
                      changeset,
                      name,
                      settings,
                      value,
                      rowIndex,
                      columnIndex
                    )
                  },
                  value: getCellValue(
                    changeset.getValue(name),
                    rowIndex,
                    columnIndex
                  ),
                }),
            ])
          }),
        ])
      })
    )
  },
}

function getCellValue(
  gridValue: GridValue,
  rowIndex: number,
  columnIndex: number
): CellValue {
  if (Array.isArray(gridValue)) {
    if (Array.isArray(gridValue[rowIndex])) {
      return gridValue[rowIndex][columnIndex] || ""
    }
  }
  return ""
}

function setCellValue(
  changeset: Changeset,
  name: string,
  settings: PublishedFormQuestionGridSettings,
  value: CellValue,
  rowIndex: number,
  columnIndex: number
): void {
  const gridValue = duplicateAndFormatGridValue(
    changeset.getValue(name),
    settings,
    rowIndex,
    columnIndex
  )

  gridValue[rowIndex][columnIndex] = formatCellValue(
    value,
    settings.rows()[rowIndex],
    settings.columns()[columnIndex]
  )

  applySums(gridValue, settings)

  changeset.change(name, gridValue)
}

function duplicateAndFormatGridValue(
  gridValue: GridValue | null,
  settings: PublishedFormQuestionGridSettings,
  rowIndex: number,
  columnIndex: number
): GridValue {
  if (Array.isArray(gridValue)) {
    return settings.rows().map((row, rowIndex) => {
      return settings.columns().map((column, columnIndex) => {
        if (Array.isArray(gridValue[rowIndex])) {
          return gridValue[rowIndex][columnIndex]
        } else {
          return null
        }
      })
    })
  } else {
    return settings.rows().map(() => {
      return settings.columns().map(() => null)
    })
  }
}

function formatCellValue(
  value = "",
  row: PublishedFormQuestionColumnSettings,
  column: PublishedFormQuestionColumnSettings
): CellValue {
  const splitValue = (value || "").split("")
  let updatedValue = ""
  switch (row.dataType() || column.dataType()) {
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

function applySums(
  gridValue: GridValue,
  settings: PublishedFormQuestionGridSettings
): void {
  const rows = settings.rows()
  const columns = settings.columns()

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      if (getDataType(rows[rowIndex], columns[columnIndex]) === "sum") {
        let sum = 0

        if (rows[rowIndex].dataType() === "sum") {
          for (let r = 0; r < rowIndex; r++) {
            const dataType = getDataType(rows[r], columns[columnIndex])
            if (["integer", "float", "sum"].indexOf(dataType) !== -1) {
              sum += parseFloat(gridValue[r][columnIndex]) || 0
            }
          }
        }

        if (columns[columnIndex].dataType() === "sum") {
          for (let c = 0; c < columnIndex; c++) {
            const dataType = getDataType(rows[rowIndex], columns[c])
            if (["integer", "float", "sum"].indexOf(dataType) !== -1) {
              sum += parseFloat(gridValue[rowIndex][c]) || 0
            }
          }
        }

        gridValue[rowIndex][columnIndex] = `${sum}`
      }
    }
  }
}

function getDataType(
  row: PublishedFormQuestionColumnSettings,
  column: PublishedFormQuestionColumnSettings
): string | null {
  if (row.dataType() === "sum" || column.dataType() === "sum") {
    return "sum"
  } else {
    return row.dataType() || column.dataType()
  }
}
