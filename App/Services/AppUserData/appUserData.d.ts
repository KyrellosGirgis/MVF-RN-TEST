import { Role } from 'App/Services/API/Requests/userData/userData.d'

export interface MobileProduct {
  itemTitle: string
  itemSubTitle: string
  itemImage: string
  id?: string
  type: string
  marketCode?: string
  ban?: number
  hasBanAccess: boolean
  mboName?: string
  mboId?: number
  contractMboId?: number
  contractRole?: Role
}

export interface FixedNetProduct {
  itemTitle: string
  itemSubTitle: string
  itemImage: string
  id?: string
  type: string
}

export interface CableProduct {
  itemTitle: string
  itemSubTitle: string
  itemImage: string
  id?: string
  type: string
}

export interface UnityMediaProduct {
  itemTitle: string
  itemSubTitle: string
  itemImage: string
  id?: string
  type: string
  region?: string
}
