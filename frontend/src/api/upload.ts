import { postData } from './requests'
import { ServerMessage } from './RequestConfigs'

export interface UploadFile {
  eventId: string
  uploadKey: string
  file: string
  overwrite: boolean
  results: string
  winsplits: string
  routegadget: string
}

export interface UploadResult {
  eventId: string
  name: string
  course: string
  time: string
}

export interface UploadStream {
  eventId: string
  uploadKey: string
  file: string
  course: string
}

export const uploadFile = (data: UploadFile): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/upload`,
    data,
    useServerErrorMessage: true,
    customSuccessMessage: `Results Uploaded Successfully`,
    customErrorHandler: true,
  })

export const uploadResult = (
  data: UploadResult
): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/upload/result`,
    data,
    customErrorMessage: 'Problem Uploading Result',
    customSuccessMessage: `Result for \`${data.name}\` Created`,
    customErrorHandler: true,
  })

export const uploadStream = (
  data: UploadStream
): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/upload/stream`,
    data,
    useServerErrorMessage: true,
    customSuccessMessage: `Results Uploaded Successfully`,
    customErrorHandler: true,
  })
