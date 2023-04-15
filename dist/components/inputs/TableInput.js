import * as m from "mithril";
export const TableInput = {
    view: ({ attrs: { changeset, name, settings } }) => {
        const tableValue = getValue(changeset, name, settings);
        return m("table.input-table", [
            m("tr.input-table__row", settings.columns().map((column) => {
                return m("td.input-table__cell.input-table__cell--header", column.title());
            }), m("td.input-table__cell.input-table__cell--control", m("a.link.color-green", {
                onclick: () => {
                    addRow(changeset, name, tableValue, settings);
                },
            }, "add row"))),
            tableValue.map((row, rowIndex) => {
                return m("tr.input-table__row", settings.columns().map((column, columnIndex) => m("td.input-table__cell.input-table__cell--input", [
                    column.dataType() === "sum" &&
                        m(".p-2", tableValue[rowIndex][columnIndex]),
                    column.dataType() !== "sum" &&
                        m("input.input-table__cell__input", {
                            oninput: (event) => {
                                const value = event.target.value;
                                setCellValue(changeset, name, settings, tableValue, value, rowIndex, columnIndex);
                            },
                            value: tableValue[rowIndex][columnIndex],
                        }),
                ])), m("td.input-table__cell.input-table__cell--control", m("a.link.color-red", {
                    onclick: () => {
                        removeRow(changeset, name, tableValue, rowIndex);
                    },
                }, "remove")));
            }),
        ]);
    },
};
function getValue(changeset, name, settings) {
    const tableValue = changeset.getValue(name);
    if (!Array.isArray(tableValue) || tableValue.length === 0) {
        return [settings.columns().map(() => null)];
    }
    else {
        return tableValue.map((rowValue) => {
            if (Array.isArray(rowValue)) {
                return settings.columns().map((column, index) => rowValue[index]);
            }
            else {
                return settings.columns().map(() => null);
            }
        });
    }
}
function setCellValue(changeset, name, settings, tableValue, value, rowIndex, columnIndex) {
    tableValue[rowIndex][columnIndex] = formatCellValue(value, settings.columns()[columnIndex]);
    applySums(tableValue, settings);
    changeset.change(name, tableValue);
}
function formatCellValue(value = "", column) {
    const splitValue = (value || "").split("");
    let updatedValue = "";
    switch (column.dataType()) {
        case "float":
            for (const index in splitValue) {
                if ("0123456789.-".indexOf(splitValue[index]) !== -1) {
                    updatedValue += splitValue[index];
                }
            }
            return updatedValue;
        case "integer":
            for (const index in splitValue) {
                if ("0123456789-".indexOf(splitValue[index]) !== -1) {
                    updatedValue += splitValue[index];
                }
            }
            return updatedValue;
        default:
            return value;
    }
}
function addRow(changeset, name, tableValue, settings) {
    tableValue.push(settings.columns().map(() => null));
    changeset.change(name, tableValue);
}
function removeRow(changeset, name, tableValue, rowIndex) {
    tableValue.splice(rowIndex, 1);
    changeset.change(name, tableValue);
}
function applySums(tableValue, settings) {
    const columns = settings.columns();
    for (let rowIndex = 0; rowIndex < tableValue.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            if (columns[columnIndex].dataType() === "sum") {
                let sum = 0;
                if (columns[columnIndex].dataType() === "sum") {
                    for (let c = 0; c < columnIndex; c++) {
                        const dataType = columns[c].dataType();
                        if (["integer", "float", "sum"].indexOf(dataType) !== -1) {
                            sum += parseFloat(tableValue[rowIndex][c]) || 0;
                        }
                    }
                }
                tableValue[rowIndex][columnIndex] = `${sum}`;
            }
        }
    }
}
//# sourceMappingURL=TableInput.js.map