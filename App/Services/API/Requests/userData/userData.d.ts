/* eslint-disable no-unused-vars */
export interface userDataType {
  userAccountVBO: UserAccountVBO
}

export interface UserAccountVBO {
  authLevel: string
  onlineUser: OnlineUser
  activeContractMobile: ActiveContractMobile
  mobile?: Mobile[]
  fixednet?: FixedNet[]
  cable?: Cable[]
  unitymedia?: UnityMedia[]
}
export interface ActiveContractMobile {
  id: number
}

export interface Mobile {
  contract: Contract
}

export enum Access {
  AccessSubscription = 'AccessSubscription',
  CustomerAccount = 'CustomerAccount'
}

export enum MarketCode {
  MMC = 'MMC',
  Mmo = 'MMO'
}

export enum UserDataServicesTypes {
  mobile = 'mobile',
  fixednet = 'fixednet',
  cable = 'cable',
  unitymedia = 'unitymedia'
}

export enum Role {
  CustomerAccountAdmin = 'CustomerAccountAdmin',
  SubscriptionAdmin = 'SubscriptionAdmin'
}

export enum Status {
  Effective = 'effective'
}

export enum SubType {
  Ek = 'EK',
  Kd = 'KD',
  Tn = 'TN'
}

export interface OnlineUser {
  mintUserID: number
  onlineUserID: number
  userName: string
  title: string
  firstName: string
  lastName: string
  lastLoginDate: Date
  primaryEmail: string
  emailValidationStatus: string
  isFirstLogin: boolean
  permissionFlag: boolean
}

export interface Contract {
  mboId?: number
  partyRoleId?: number
  ban?: number
  marketCode: MarketCode
  subType?: SubType
  role?: Role
  access?: Access
  status?: Status
  registrationDate?: Date
  isActiveContract?: boolean
  subscription?: Subscription[]
  msisdn: number
  isFemtoSubscription?: boolean
  mboName?: string
}

export interface Subscription {
  mboId: number
  partyRoleId?: number
  ban?: number
  marketCode: MarketCode
  subType?: SubType
  role?: Role
  access?: Access
  status?: Status
  registrationDate?: Date
  isActiveContract?: boolean
  msisdn: number
  isFemtoSubscription?: boolean
  mboName?: string
}

export interface MobileSubscription extends Subscription {
  contractRole?: Role
  contractMboId?: number
}

export interface FixedNet {
  access?: string
  uoi?: string
  partyRoleId?: number
  subType?: string
  role?: string
  status?: string
  registrationDate?: Date
  isActiveContract?: boolean
  mboId?: number
  acn?: string
  mboName?: string
}

export interface Cable {
  isDefaultContract?: boolean
  id?: string
  isActiveContract?: boolean
  hasCableMail?: boolean
  subscription?: CableSubscription[]
}

export interface CableSubscription {
  id?: string
  displayName?: string
  activatedDate?: Date
  type?: string
  name?: string
}

export interface UnityMedia {
  id?: number
  registrationDate?: Date
  isDefaultContract?: boolean
  accountNumber?: number
  subType?: string
  access?: string
  accessGroups?: string[]
  partyRoleId?: number
  region?: string
  role?: string
  isActiveContract?: boolean
  subscription?: UnityMediaSubscription[]
  name?: string
  status?: string
}

export interface UnityMediaSubscription {
  name?: string
  status?: number
  code?: string
}
export interface ActiveSubscription {
  id?: string
  itemTitle?: string
  itemSubTitle?: string
  itemImage?: string
  type?: UserDataServicesTypes
  marketCode?: MarketCode
  ban?: number
  region?: string
}
