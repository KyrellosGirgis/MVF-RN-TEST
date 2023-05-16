import React, { useEffect, useState } from 'react'

import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './CurrentScreen.styles'

import DeveloperSettingsCardSection from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { getLastScreenName } from 'App/Utils/Helpers/generic.helpers'

const CurrentScreenCard = () => {
  const theme = useTheme()

  const [screenName, setScreenName] = useState('')

  useEffect(() => {
    setTimeout(async () => {
      setScreenName(getLastScreenName())
    }, 0)
  }, [])

  const renderCurrentScreenName = () => {
    return (
      <VFText
        style={styles.textStyle(theme)}
        i18nKey={`${screenName}`}
        testID={testID('current_screen_title')}
      />
    )
  }

  return (
    <DeveloperSettingsCard title="Current Screen">
      <DeveloperSettingsCardSection
        title="Screen Name: "
        renderRightElement={renderCurrentScreenName}
        containerStyle={styles.cardSectionStyleWithNoBorder}
      />
    </DeveloperSettingsCard>
  )
}

export default CurrentScreenCard
