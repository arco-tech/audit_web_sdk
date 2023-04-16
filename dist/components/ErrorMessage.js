import m from "mithril";
import { sentence } from "../Grammar.js";
export const ErrorMessage = {
    view: ({ attrs: { error } }) => {
        if (error && typeof error === "string") {
            return m(".error-message", sentence(error));
        }
        else if (error && Array.isArray(error)) {
            return error.map((errorItem) => {
                if (errorItem) {
                    return m(".error-message", sentence(errorItem));
                }
            });
        }
    },
};
//# sourceMappingURL=ErrorMessage.js.map