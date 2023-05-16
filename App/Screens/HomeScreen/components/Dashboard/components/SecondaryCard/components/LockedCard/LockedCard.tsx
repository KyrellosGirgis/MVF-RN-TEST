import React from 'react'
import { View } from 'react-native'

import { Icon, VFText } from '@vfgroup-oneplatform/foundation/Components'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './LockedCard.styles'
import Images from 'App/Themes/Images'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const LockedCard = () => {
  const theme = useTheme()

  return (
    <View
      style={styles.lockedCardContainer}
      testID={testID('SecondaryCardLockedBillContainer')}
    >
      <Icon
        size={50}
        style={styles.padLockIconStyle}
        name={Images.icPadlockOpenMid}
        type="image"
        testID={testID('SecondaryCardLockedBillImage_icon')}
      />
      <VFText
        i18nKey={'sub_tray_access_secure_content_subtitle'}
        style={styles.lockedCardText(theme)}
        testID={testID('SecondaryCardLockedBillDescription_txt')}
      />
    </View>
  )
}

export default LockedCard
