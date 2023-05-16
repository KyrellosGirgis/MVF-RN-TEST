/* eslint-disable no-unused-vars */
interface relatedPartyItem {
  id: string
  role: string
  '@type': string
}

export interface CableInboxItem {
  id: string
  href: string
  creationDate: string
  documentType: string
  name: string
  relatedParty: relatedPartyItem[]
  '@type': string
}
