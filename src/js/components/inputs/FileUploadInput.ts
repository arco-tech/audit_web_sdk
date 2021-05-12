import * as m from "mithril"
import { Changeset } from "../../Changeset"
import * as FileUploadAPI from "../../api/public_forms/FileUploadAPI"

interface UploadStatus {
  name: string
  status: string
}

interface Attrs {
  changeset: Changeset
  name: string
  questionID: number
}

interface State {
  input: HTMLInputElement
  statuses: UploadStatus[]
  drag?: boolean
}

export const FileUploadInput: m.Component<Attrs> = {
  oninit: ({ state }) => {
    state.statuses = []
  },

  view: ({ attrs: { changeset, name, questionID }, state }) => {
    let value = (changeset.getValue(name) || [])

    return [
      m(".file-input" + (state.drag ? ".file-input--drag" : ""), {
        ondrop: (event) => {
          console.log("drop", event)
        },
        ondragover: (event) => {
          state.drag = true
          console.log("drag", event)
        },
        ondragleave: (event) => {
          state.drag = false
          console.log("leave")
        },
      }, [
        "Drag and drop files or ",
        m(".file-input__link", {
          onclick: () => {
            state.input.click()
          }
        }, "select files"),
      ]),
      m("input", {
        type: "file",
        multiple: true,
        style: "display: none;",
        oncreate: (vnode) => {
          state.input = vnode.dom
        },
        oninput: (event) => {
          Array.from(event.target.files).forEach((file) => {
            upload(file as File, questionID, state)
              .then((upload) => {
                changeset.change(name,
                  value.concat([{ id: upload.id, name: upload.name }]))
              })
          })
          event.target.value = ""
        },
      }),
      value.map(({ name }, index) => {
        return m(".file-input__value", [
          m(".file-input__value__name", name),
          m(".file-input__value__remove-button", {
            onclick: () => {
              value = (changeset.getValue(name) || [])
              changeset.change(name, [].concat(value.splice(index, 1)))
            },
          }, "remove"),
        ])
      }),
      state.statuses.map(({ name, status }) => {
        if (status === "failed") {
          return m(".file-input__status.file-input__status--failed",
            `${name} - failed`)
        } else if (status !== "success") {
          return m(".file-input__status", `${name} - ${status}`)
        }
      }),
    ]
  },
}

function upload(
  file: File,
  questionID: number,
  state: State,
): Promise<FileUploadAPI.FileUpload> {
  const uploadStatus = {name: file.name, status: "uploading..."}
  state.statuses.push(uploadStatus)

  return new Promise((resolve, reject) => {
    (file as any).text()
      .then((content) => {
        FileUploadAPI.upload({
          name: file.name,
          content,
          question_id: questionID,
        })
          .then((fileUpload) => {
            uploadStatus.status = "success"
            resolve(fileUpload)
            m.redraw()
          })
          .catch((error) => {
            uploadStatus.status = "failed"
            reject(error)
            m.redraw()
          })
      })
      .catch((error) => {
        uploadStatus.status = "failed"
        reject(error)
        m.redraw()
      })
  })
}
