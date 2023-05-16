import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Icon, VFText } from '@vfgroup-oneplatform/foundation/Components'

import {
  withTheme,
  LightThemeColors
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from 'App/Themes'

import styles from './UsageEditCard.Styles'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'

type UsageEditCardProps = {
  theme: {
    name: string
  }
}

const UsageEditCard = (props: UsageEditCardProps) => {
  const { theme } = props
  const images = getThemeImages(theme.name)
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        NavigationFunctions.navigate(Routes.EditDashboardTiles, {
          showBackButton: false
        })
      }}
      testID="UsageEditCard_TouchableWithoutFeedback_Wrapper"
    >
      <View style={styles.container} testID="UsageEditCard_Content_Container">
        <View
          style={styles.editIconContainer}
          testID="UsageEditCard_Content_EditIcon_Container"
        >
          <VFText
            type="tertiary"
            style={styles.editText}
            i18nKey="usage_edit_button"
            testID="UsageEditCard_Content_EditText"
          />
          <Icon
            style={styles.editIcon}
            name={images.cluster}
            type="image"
            testID="UsageEditCard_Content_EditIcon"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
UsageEditCard.defaultProps = {
  theme: LightThemeColors
}

export default withTheme(UsageEditCard)
