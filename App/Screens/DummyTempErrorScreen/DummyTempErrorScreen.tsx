import React from 'react'

import { VFScreen } from '@vfgroup-oneplatform/foundation/Components'

import { useRoute } from '@react-navigation/native'

import ErrorComponent from 'App/Components/ErrorComponent/ErrorComponent'
import { NavigationFunctions } from 'App/Containers'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const DummyTempErrorScreen = () => {
  const onClose = () => NavigationFunctions.goBack()
  const { params } = useRoute()
  return (
    <VFScreen
      title="Error"
      withHeaderSpace
      showBack
      testID={testID('Error-screen')}
      onBack={onClose}
      onClose={onClose}
      clearStatusBarEntries={false}
    >
      <ErrorComponent
        text={params?.message || "YOU DON'T HAVE BAN LEVEL ACCESS"}
        textButton="Go Back"
        iconName="ic_WarningHiLight_Theme"
      />
    </VFScreen>
  )
}

export default DummyTempErrorScreen
