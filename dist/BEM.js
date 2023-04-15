export function block(blockName, modifierNames) {
    return `.${blockName}${modifiers(blockName, modifierNames || [])}`;
}
export function modifiers(blockName, modifierNames) {
    if (Array.isArray(modifierNames)) {
        return modifierNames
            .filter((modifierName) => {
            return typeof modifierName === "string";
        })
            .map((modifierName) => {
            return `.${blockName}--${modifierName}`;
        }).join("");
    }
    else if (typeof modifierNames === "string") {
        return `.${blockName}--${modifierNames}`;
    }
    else {
        return "";
    }
}
//# sourceMappingURL=BEM.js.map