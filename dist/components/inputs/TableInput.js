"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableInput = void 0;
var m = require("mithril");
exports.TableInput = {
    view: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name, settings = _b.settings;
        var tableValue = getValue(changeset, name, settings);
        return m("table.input-table", [
            m("tr.input-table__row", settings.columns().map(function (column) {
                return m("td.input-table__cell.input-table__cell--header", column.title());
            }), m("td.input-table__cell.input-table__cell--control", m("a.link.color-green", {
                onclick: function () {
                    addRow(changeset, name, tableValue, settings);
                },
            }, "add row"))),
            tableValue.map(function (row, rowIndex) {
                return m("tr.input-table__row", settings.columns().map(function (column, columnIndex) {
                    return m("td.input-table__cell.input-table__cell--input", [
                        column.dataType() === "sum" &&
                            m(".p-2", tableValue[rowIndex][columnIndex]),
                        column.dataType() !== "sum" &&
                            m("input.input-table__cell__input", {
                                oninput: function (event) {
                                    var value = event.target.value;
                                    setCellValue(changeset, name, settings, tableValue, value, rowIndex, columnIndex);
                                },
                                value: tableValue[rowIndex][columnIndex],
                            }),
                    ]);
                }), m("td.input-table__cell.input-table__cell--control", m("a.link.color-red", {
                    onclick: function () {
                        removeRow(changeset, name, tableValue, rowIndex);
                    },
                }, "remove")));
            }),
        ]);
    },
};
function getValue(changeset, name, settings) {
    var tableValue = changeset.getValue(name);
    if (!Array.isArray(tableValue) || tableValue.length === 0) {
        return [settings.columns().map(function () { return null; })];
    }
    else {
        return tableValue.map(function (rowValue) {
            if (Array.isArray(rowValue)) {
                return settings.columns().map(function (column, index) { return rowValue[index]; });
            }
            else {
                return settings.columns().map(function () { return null; });
            }
        });
    }
}
function setCellValue(changeset, name, settings, tableValue, value, rowIndex, columnIndex) {
    tableValue[rowIndex][columnIndex] = formatCellValue(value, settings.columns()[columnIndex]);
    applySums(tableValue, settings);
    changeset.change(name, tableValue);
}
function formatCellValue(value, column) {
    if (value === void 0) { value = ""; }
    var splitValue = (value || "").split("");
    var updatedValue = "";
    switch (column.dataType()) {
        case "float":
            for (var index in splitValue) {
                if ("0123456789.-".indexOf(splitValue[index]) !== -1) {
                    updatedValue += splitValue[index];
                }
            }
            return updatedValue;
        case "integer":
            for (var index in splitValue) {
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
    tableValue.push(settings.columns().map(function () { return null; }));
    changeset.change(name, tableValue);
}
function removeRow(changeset, name, tableValue, rowIndex) {
    tableValue.splice(rowIndex, 1);
    changeset.change(name, tableValue);
}
function applySums(tableValue, settings) {
    var columns = settings.columns();
    for (var rowIndex = 0; rowIndex < tableValue.length; rowIndex++) {
        for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            if (columns[columnIndex].dataType() === "sum") {
                var sum = 0;
                if (columns[columnIndex].dataType() === "sum") {
                    for (var c = 0; c < columnIndex; c++) {
                        var dataType = columns[c].dataType();
                        if (["integer", "float", "sum"].indexOf(dataType) !== -1) {
                            sum += parseFloat(tableValue[rowIndex][c]) || 0;
                        }
                    }
                }
                tableValue[rowIndex][columnIndex] = "".concat(sum);
            }
        }
    }
}
//# sourceMappingURL=TableInput.js.map