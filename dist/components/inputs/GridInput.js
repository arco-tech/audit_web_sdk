"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m = require("mithril");
exports.GridInput = {
    view: function (_a) {
        var _b = _a.attrs, changeset = _b.changeset, name = _b.name, settings = _b.settings;
        return m("table.input-table", m("tr.input-table__row", [
            m("td.input-table__cell.input-table__cell--header"),
            settings
                .columns()
                .map(function (column) {
                return m("td.input-table__cell.input-table__cell--header", column.title());
            }),
        ]), settings.rows().map(function (row, rowIndex) {
            return m("tr.input-table__row", [
                m("td.input-table__cell.input-table__cell--header", row.title()),
                settings.columns().map(function (column, columnIndex) {
                    var isSum = row.dataType === "sum" || column.dataType === "sum";
                    return m("td.input-table__cell.input-table__cell--input", [
                        isSum &&
                            m(".p-2", getCellValue(changeset.getValue(name), rowIndex, columnIndex)),
                        !isSum &&
                            m("input.input-table__cell__input", {
                                oninput: function (event) {
                                    var value = event.target.value;
                                    setCellValue(changeset, name, settings, value, rowIndex, columnIndex);
                                },
                                value: getCellValue(changeset.getValue(name), rowIndex, columnIndex),
                            }),
                    ]);
                }),
            ]);
        }));
    },
};
function getCellValue(gridValue, rowIndex, columnIndex) {
    if (Array.isArray(gridValue)) {
        if (Array.isArray(gridValue[rowIndex])) {
            return gridValue[rowIndex][columnIndex] || "";
        }
    }
    return "";
}
function setCellValue(changeset, name, settings, value, rowIndex, columnIndex) {
    var gridValue = duplicateAndFormatGridValue(changeset.getValue(name), settings, rowIndex, columnIndex);
    gridValue[rowIndex][columnIndex] = formatCellValue(value, settings.rows()[rowIndex], settings.columns()[columnIndex]);
    applySums(gridValue, settings);
    changeset.change(name, gridValue);
}
function duplicateAndFormatGridValue(gridValue, settings, rowIndex, columnIndex) {
    if (Array.isArray(gridValue)) {
        return settings.rows().map(function (row, rowIndex) {
            return settings.columns().map(function (column, columnIndex) {
                if (Array.isArray(gridValue[rowIndex])) {
                    return gridValue[rowIndex][columnIndex];
                }
                else {
                    return null;
                }
            });
        });
    }
    else {
        return settings.rows().map(function () {
            return settings.columns().map(function () { return null; });
        });
    }
}
function formatCellValue(value, row, column) {
    if (value === void 0) { value = ""; }
    var splitValue = (value || "").split("");
    var updatedValue = "";
    switch (row.dataType() || column.dataType()) {
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
function applySums(gridValue, settings) {
    var rows = settings.rows();
    var columns = settings.columns();
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            if (getDataType(rows[rowIndex], columns[columnIndex]) === "sum") {
                var sum = 0;
                if (rows[rowIndex].dataType() === "sum") {
                    for (var r = 0; r < rowIndex; r++) {
                        var dataType = getDataType(rows[r], columns[columnIndex]);
                        if (["integer", "float", "sum"].indexOf(dataType) !== -1) {
                            sum += parseFloat(gridValue[r][columnIndex]) || 0;
                        }
                    }
                }
                if (columns[columnIndex].dataType() === "sum") {
                    for (var c = 0; c < columnIndex; c++) {
                        var dataType = getDataType(rows[rowIndex], columns[c]);
                        if (["integer", "float", "sum"].indexOf(dataType) !== -1) {
                            sum += parseFloat(gridValue[rowIndex][c]) || 0;
                        }
                    }
                }
                gridValue[rowIndex][columnIndex] = "" + sum;
            }
        }
    }
}
function getDataType(row, column) {
    if (row.dataType() === "sum" || column.dataType() === "sum") {
        return "sum";
    }
    else {
        return row.dataType() || column.dataType();
    }
}
//# sourceMappingURL=GridInput.js.map