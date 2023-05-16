interface Attributes {
  MCC_3522: string
  MCC_3661: string
  Test_Prio_Campcode_1: string
  domainName: string
  MCC_3472: string
  marketCode: string
  MCC_3042: string
  MCC_3519: string
  cc: string
  fctk: string
  MCC_3521: string
  city: string
}

interface NotificationStatus {
  'LI-NBA': boolean
  'HVF-DP': boolean
  'LI-OM': boolean
  'HVF-CP': boolean
  'LI-OPT': boolean
}

interface PermissionsLastModification {
  blacklist: string
  ADV_GENE: string
  'HVF-DP': string
  ADV_TWIB: string
  DEV_GENE: string
  ADV_POST: string
  DEV_1: string
  'LI-NBA': string
  ADV_1: string
  DEV_CDEV: string
  DEV_GEO: string
  DEV_WBT: string
  ADV_2: string
  PDX: string
  ADV_SMMS: string
  'LI-OM': string
  ADV_TOUT: string
  'HVF-CP': string
  'LI-OPT': string
  ADV_EMAL: string
  DEV_2: string
}

interface RootObject {}

interface Notification {
  name: string
  version: number
  permissions: string[]
}

export interface Permission {
  'LI-OM': boolean
  'LI-OPT': boolean
  'LI-NBA': boolean
}
export interface Permissions {
  blacklist: boolean
  ADV_GENE: boolean
  'HVF-DP': boolean
  ADV_TWIB: boolean
  DEV_GENE: boolean
  ADV_POST: boolean
  DEV_1: boolean
  'LI-NBA': boolean
  ADV_1: boolean
  DEV_CDEV: boolean
  DEV_GEO: boolean
  DEV_WBT: boolean
  ADV_2: boolean
  PDX: boolean
  ADV_SMMS: boolean
  'LI-OM': boolean
  ADV_TOUT: boolean
  'HVF-CP': boolean
  'LI-OPT': boolean
  ADV_EMAL: boolean
  DEV_2: boolean
}
export interface NotificationHistory {
  name: string
  version: number
  permissions: string[]
  date: string
}

export interface Info {
  umid: string
  state: number
  permissions: Permissions
  permissionsLastModification: PermissionsLastModification
  notificationHistory: NotificationHistory[]
  notificationStatus: NotificationStatus
  attributes: Attributes
}

export interface InfoPayload {
  permission: Permission
  notification: Notification[]
}
