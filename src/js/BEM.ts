export function block(
  blockName: string,
  modifierNames?: any,
): string {
  return `.${blockName}${modifiers(blockName, modifierNames || [])}`;
}

export function modifiers(
  blockName: string,
  modifierNames: any,
): string {
  if (Array.isArray(modifierNames)) {
    return modifierNames
      .filter((modifierName: any) => {
        return typeof modifierName === "string";
      })
      .map((modifierName: string) => {
        return `.${blockName}--${modifierName}`;
      }).join("");
  } else if (typeof modifierNames === "string") {
    return `.${blockName}--${modifierNames}`;
  } else {
    return "";
  }
}
