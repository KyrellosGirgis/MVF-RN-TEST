export type BillingInformation = {
  amount: number
  currency: string
  date: string
}

export type CreditInformation = {
  value: number
  currency: string
  lastUpdate: string
}

export type MediumTile = {
  id: string
  parent: string
  rank: number
  type: string
  subType: string
  title: string
  description: string
  icon: Self
  action: Self
  billingInformation: BillingInformation
  creditInformation: CreditInformation
}

export interface Self {
  href: string
}

export type MediumTiles = {
  mediumTiles: MediumTile[]
  _links: Self
}
