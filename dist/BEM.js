"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifiers = exports.block = void 0;
function block(blockName, modifierNames) {
    return ".".concat(blockName).concat(modifiers(blockName, modifierNames || []));
}
exports.block = block;
function modifiers(blockName, modifierNames) {
    if (Array.isArray(modifierNames)) {
        return modifierNames
            .filter(function (modifierName) {
            return typeof modifierName === "string";
        })
            .map(function (modifierName) {
            return ".".concat(blockName, "--").concat(modifierName);
        }).join("");
    }
    else if (typeof modifierNames === "string") {
        return ".".concat(blockName, "--").concat(modifierNames);
    }
    else {
        return "";
    }
}
exports.modifiers = modifiers;
//# sourceMappingURL=BEM.js.map