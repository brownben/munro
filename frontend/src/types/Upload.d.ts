interface UploadFile {
  eventId: string
  uploadKey: string
  file: string
  overwrite: boolean
  results: string
  winsplits: string
  routegadget: string
}

interface UploadResult {
  eventId: string
  name: string
  course: string
  time: string
}

interface UploadSimple {
  eventId: string
  uploadKey: string
  file: string
  course: string
}
