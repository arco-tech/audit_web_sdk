"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Industry_1 = require("../../Industry");
var API_1 = require("./API");
function industries() {
    return API_1.request("get", "industries")
        .then(function (industriesData) {
        return industriesData.map(function (industryData) {
            return new Industry_1.Industry(industryData);
        });
    });
}
exports.industries = industries;
//# sourceMappingURL=IndustryAPI.js.map