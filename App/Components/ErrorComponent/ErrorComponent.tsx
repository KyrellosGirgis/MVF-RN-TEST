import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { VFText, Icon } from '@vfgroup-oneplatform/foundation/Components'
import {
  getThemeImages,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './ErrorComponent.styles'

import { ErrorScreenProps } from './ErrorComponent.d'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const ErrorComponent = (props: ErrorScreenProps) => {
  const {
    backgroundStyle,
    iconName,
    iconStyle,
    description,
    descriptionStyle,
    placeholders,
    iconTestId,
    descriptionTestId,
    images,
    withTryAgainButton,
    tryAgainButtonTestId,
    withHeader,
    header,
    headerTestId,
    onTryAgainPress
  } = props
  const theme = useTheme()
  const _images = images || getThemeImages(theme.name)

  return (
    <View
      style={[styles.background(theme), backgroundStyle]}
      testID={testID('ErrorComponentWrapper')}
    >
      <Icon
        name={_images[iconName]}
        type="image"
        size={92}
        style={[styles.icon, iconStyle]}
        testID={testID(iconTestId)}
      />
      {withHeader && (
        <VFText
          i18nKey={header}
          style={[styles.header(theme)]}
          testID={testID(headerTestId)}
        />
      )}
      <VFText
        i18nKey={description}
        placeHolders={placeholders}
        style={[styles.description(theme), descriptionStyle]}
        testID={testID(descriptionTestId)}
      />

      {withTryAgainButton && (
        <TouchableOpacity
          style={styles.tryAgainContainer}
          onPress={onTryAgainPress}
          testID={testID(`${tryAgainButtonTestId}_btn`)}
        >
          <VFText
            i18nKey="dashboard_loading_error_try_again_button"
            style={styles.tryAgainText(theme)}
            testKey={testID(`${tryAgainButtonTestId}_txt`)}
          />
          <Image
            source={_images.ic_RefreshRed}
            style={styles.tryAgainImage}
            testID={testID(`${tryAgainButtonTestId}_icon`)}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

ErrorComponent.defaultProps = {
  withTryAgainButton: false
}

export default ErrorComponent
