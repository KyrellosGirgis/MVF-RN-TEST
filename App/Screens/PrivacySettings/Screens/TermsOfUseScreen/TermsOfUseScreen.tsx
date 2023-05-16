import React from 'react'

import PrivacySettingsDetails from 'App/Screens/PrivacySettings/Components/PrivacySettingsDetails/PrivacySettingsDetails'
import { ApiRoutes } from 'App/Services'
import { translate } from 'App/Utils'

const TermsOfUseScreen = () => {
  return (
    <>
      <PrivacySettingsDetails
        apiRoute={ApiRoutes.Mint.termsOfUse}
        testId="termsOfUse"
        screenTitle={translate('terms_of_use_screen_title')}
      />
    </>
  )
}

export default TermsOfUseScreen
