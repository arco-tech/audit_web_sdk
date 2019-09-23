const lineEndings = ".:;?".split("");
  
export function capitalise(text: string): string {
  text = (text || "").trim();
  if (text.length > 0) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  } else {
    return text;
  }
}

export function fullStop(text: string): string {
  text = (text || "").trim();
  if (
    text.length > 0 &&
    lineEndings.indexOf(text.charAt(text.length - 1)) === -1
  ) {
    return text + ".";
  } else {
    return text;
  }
}

export function sentence(text: string): string {
  return capitalise(fullStop(text));
}
