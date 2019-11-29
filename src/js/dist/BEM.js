"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function block(blockName, modifierNames) {
    return "." + blockName + modifiers(blockName, modifierNames || []);
}
exports.block = block;
function modifiers(blockName, modifierNames) {
    if (Array.isArray(modifierNames)) {
        return modifierNames
            .filter(function (modifierName) {
            return typeof modifierName === "string";
        })
            .map(function (modifierName) {
            return "." + blockName + "--" + modifierName;
        }).join("");
    }
    else if (typeof modifierNames === "string") {
        return "." + blockName + "--" + modifierNames;
    }
    else {
        return "";
    }
}
exports.modifiers = modifiers;
//# sourceMappingURL=BEM.js.map