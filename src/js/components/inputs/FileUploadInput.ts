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
  statuses: UploadStatus[]
}

export const FileUploadInput: m.Component<Attrs> = {
  oninit: ({ state }) => {
    state.statuses = []
  },

  view: ({ attrs: { changeset, name, questionID }, state }) => {
    const value = (changeset.getValue(name) || [])

    return [
      m("input", {
        type: "file",
        multiple: true,
        value: changeset.getValue(name),
        oninput: (event) => {
          Array.from(event.target.files).forEach((file) => {
            upload(file, questionID, state)
              .then(({ id, name }) => {
                const value = changeset.getValue(name) || []
                changeset.change(name, value.concat([{ id, name }]))
              })
          })
          event.target.value = ""
        },
      }),
      state.statuses.map(({ name, status }) => {
        m(".file-input__status", `${name} - ${status}`),
      }),
      value.map(({ name }, index) => {
        return m(".file-input__value", [
          m(".file-input__value__name", name),
          m(".file-input__value__remove-button", {
            onclick: () => {
              changeset.setValue(name, [].concat(value.splice(index, 1)))
            },
          }, "remove"),
        ])
      })
    ]
  },
}

function upload(
  file: File,
  questionID: number,
  state: State,
): Promise<FileUploadAPI.FileUpload> {
  const uploadStatus = {name: file.name, status: "uploading"}
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
