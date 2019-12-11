export function param(name: string): string | null {
  const params = window.location.search.replace("?", "").split("&");
  for (let index in params) {
    const param = params[index].split("=");
    const key = decodeURIComponent(param[0]);
    if (key === name) {
      return decodeURIComponent(param.length === 1 ? "" : param[1]);
    }
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
