export function param(name) {
    const params = window.location.search.replace("?", "").split("&");
    for (const index in params) {
        const param = params[index].split("=");
        const key = decodeURIComponent(param[0]);
        if (key === name) {
            return decodeURIComponent(param.length === 1 ? "" : param[1]);
        }
    }
}
export function buildParams(params) {
    return Object.keys(params)
        .filter((key) => params[key])
        .map((key) => {
        if (params[key]) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
        }
    })
        .join("&");
}
//# sourceMappingURL=URI.js.map