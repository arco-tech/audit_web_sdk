export function param(name: string): string | null {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(location.search);
  if (results !== null && typeof results[1] === "string") {
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  } else {
    return null;
  }
}

export function buildParams(params: {[key: string]: string}): string {
  return Object.keys(params)
    .filter((key) => params[key])
    .map((key: string) => {
      if(params[key]) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
      }
    })
    .join("&");
}
