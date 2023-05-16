export interface DocumentDetailsResponse {
  href: string
  id: string
  name: string
  binaryAttachment: BinaryAttachment[]
  '@type': string
  creationDate?: string
  documentType?: string
}
export interface BinaryAttachment {
  mimeType: string
  id: string
  name: string
  content: string
  '@type'?: string
}
