import {
  UserDataServicesTypes,
  MarketCode
} from 'App/Services/API/Requests/userData/userData.d'
import { DATA_PRIVACY_PERMISSIONS } from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.constants'

interface BEWPermissionsStatus {
  shouldShowBEWDEV?: boolean
  shouldShowBEWADV?: boolean
  shouldShowNetperform: boolean
  originalDEV?: boolean
  originalADV?: boolean
  devBEWVersion?: number
  advBEWVersion?: number
  [DATA_PRIVACY_PERMISSIONS.DEV]?: boolean
  [DATA_PRIVACY_PERMISSIONS.ADV]?: boolean
  [DATA_PRIVACY_PERMISSIONS.NETPERFORM]?: boolean
}
interface BEWPermissionsDetails {
  permissionId?: string
  bewText?: string
  bewVersion?: number
}

interface BEWPermissionListItem extends BEWPermissionsDetails {
  bewEffectiveDate?: string
}
interface BEWPermissionsReferenceDetails extends BEWPermissionsDetails {
  serviceId?: string
  effectiveDate?: string
}

interface BEWPermission {
  customerPartyVBO?: CustomerPartyVBO[]
}

interface CustomerPartyVBO {
  type?: UserDataServicesTypes
  details?: BEWUserDetails
  marketingPreferences?: BEWMarketingPreferences
}

interface BEWUserDetails {
  accountId?: string
  msisdn?: string
  marketCode?: MarketCode
}

interface BEWMarketingPreferences {
  permissionStatus?: string
  permissionsList?: BEWPermissionListItem[]
  permissionBEWReferenceDetails?: BEWPermissionsReferenceDetails[]
  showBEW_DEV?: boolean
  showBEW_ADV?: boolean
  Original_DEV?: boolean
  Original_ADV?: boolean
}

export {
  BEWPermissionsStatus,
  BEWPermissionsReferenceDetails,
  BEWPermission,
  CustomerPartyVBO,
  BEWUserDetails,
  BEWMarketingPreferences
}
