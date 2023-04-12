"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionInput = void 0;
var Questions = require("../../Questions");
exports.QuestionInput = {
    view: function (_a) {
        var _b = _a.attrs, question = _b.question, attrs = __rest(_b, ["question"]);
        return Questions.render(question, attrs);
    },
};
//# sourceMappingURL=QuestionInput.js.map