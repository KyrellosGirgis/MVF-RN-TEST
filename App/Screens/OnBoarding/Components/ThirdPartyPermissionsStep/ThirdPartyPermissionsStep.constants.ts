import { ThirdPartyPermissionItem } from './ThirdPartyPermissionsStep.d'

import { THIRD_PARTY_PERMISSIONS } from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.constants'

const permissionItems: ThirdPartyPermissionItem[] = [
  {
    title: 'onboarding_3rd_party_permissions_li_opt_title',
    description: 'onboarding_3rd_party_permissions_li_opt_description',
    permissionKey: THIRD_PARTY_PERMISSIONS.LI_OPT,
    toggleTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemTitle_li_opt_toggle',
    titleTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemTitle_li_opt_txt',
    descriptionTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemDescription_li_opt_view'
  },
  {
    title: 'onboarding_3rd_party_permissions_li_om_title',
    description: 'onboarding_3rd_party_permissions_li_om_description',
    permissionKey: THIRD_PARTY_PERMISSIONS.LI_OM,
    toggleTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemTitle_li_om_toggle',
    titleTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemTitle_li_om_txt',
    descriptionTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemDescription_li_om_view'
  },
  {
    title: 'onboarding_3rd_party_permissions_li_nba_title',
    description: 'onboarding_3rd_party_permissions_li_nba_description',
    permissionKey: THIRD_PARTY_PERMISSIONS.LI_NBA,
    toggleTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemTitle_li_nba_toggle',
    titleTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemTitle_li_nba_txt',
    descriptionTestID:
      'OnboardingThirdPartyPermissionsStepPermissionItemDescription_li_nba_view'
  }
]

export { permissionItems }
