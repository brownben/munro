import { postData } from './requests'

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

export const uploadSimple = (
  data: UploadSimple
): Promise<ServerMessage | null> =>
  postData<ServerMessage>({
    apiLocation: `/api/upload/simple`,
    data,
    useServerErrorMessage: true,
    customSuccessMessage: `Results Uploaded Successfully`,
    customErrorHandler: true,
  })
