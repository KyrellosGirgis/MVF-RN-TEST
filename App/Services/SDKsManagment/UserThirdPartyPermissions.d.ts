export interface UserThirdPartyPermissions {
  /*** audience*/
  LIOM?: boolean
  /*** offers*/
  LINBA?: boolean
  /*** analytics*/
  LIOPT?: boolean
  /*** netperform*/
  NetperformPermissions?: {
    NetworkOptimizationPermission?: boolean
    /*** Personalized Netperform*/
    PersonalizedNetworkOptimizationPermission?: boolean
  }
}
