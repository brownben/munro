import { postData } from './requests'
import { ServerMessage } from './RequestConfigs'

export interface UploadResult {
  eventId: string
  name: string
  course: string
  time: string
}

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
