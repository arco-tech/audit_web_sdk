import { request } from "./API"

export interface FileUploadParams {
  name: string
  content: string
  question_id: number
}

export interface FileUpload {
  id: number
  name: string
  question_id: number
}

export function upload(params: FileUploadParams): Promise<FileUpload> {
  const body = { file_upload: params }
  return request<FileUpload>("post", "file-uploads", { body })
}
