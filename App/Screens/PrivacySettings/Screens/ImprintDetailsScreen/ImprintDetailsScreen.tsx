import React from 'react'

import { ApiRoutes } from 'App/Services'
import { translate } from 'App/Utils'
import PrivacySettingsDetails from 'App/Screens/PrivacySettings/Components/PrivacySettingsDetails/PrivacySettingsDetails'

const ImprintDetailsScreen = () => {
  return (
    <>
      <PrivacySettingsDetails
        apiRoute={ApiRoutes.Mint.imprintDetails}
        testId="imprint"
        screenTitle={translate('imprint_screen_title')}
      />
    </>
  )
}

export default ImprintDetailsScreen
