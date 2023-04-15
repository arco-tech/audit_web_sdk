import * as m from "mithril";
import { ErrorMessage } from "./ErrorMessage.js";
export const Form = {
    view: ({ attrs: { changeset, onSubmit }, children }) => {
        return m("form", {
            onsubmit: (event) => {
                event.preventDefault();
                if (onSubmit) {
                    onSubmit(changeset);
                }
            },
        }, [
            changeset.getResponseError && m(".margin-bottom-medium", [
                m(ErrorMessage, { error: changeset.getResponseError() }),
            ]),
            children,
            m("input.hide", { name: "submit", type: "submit" }),
        ]);
    },
};
//# sourceMappingURL=Form.js.map