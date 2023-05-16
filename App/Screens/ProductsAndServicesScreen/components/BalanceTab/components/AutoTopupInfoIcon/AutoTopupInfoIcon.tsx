import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon, IconTypes } from '@vfgroup-oneplatform/foundation/Components'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Images } from 'App/Themes'

import { showAutoTopupInfoModal } from './AutoTopupInfoIcon.helpers'

import styles from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.styles'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const AutoTopupInfoIcon = () => {
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={styles.rightIconContainer}
      onPress={() => showAutoTopupInfoModal(theme)}
      testID={testID('rightIconTestID')}
    >
      <Icon type={IconTypes.image} name={Images.icInfoCircleWhite} />
    </TouchableOpacity>
  )
}

export default AutoTopupInfoIcon
