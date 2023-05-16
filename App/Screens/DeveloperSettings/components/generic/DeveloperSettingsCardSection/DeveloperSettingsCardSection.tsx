import React from 'react'
import { View } from 'react-native'
import { VFText, VFButton } from '@vfgroup-oneplatform/foundation/Components'

import {
  LightThemeColors,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './DeveloperSettingsCardSection.styles'

import { DeveloperSettingsCardSectionTypes } from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection.d'

const DeveloperSettingsCardSection = ({
  title,
  buttonText,
  description,
  onPress,
  disabled,
  renderRightElement,
  containerStyle,
  titleContainerStyle,
  titleStyle,
  descriptionStyle,
  buttonStyle,
  buttonTextStyle,
  disabledButtonStyle,
  disabledButtonTextStyle,
  rightBtnAccessibilityLabel,
  ...props
}: DeveloperSettingsCardSectionTypes) => {
  const theme = useTheme()
  const { colors } = theme
  return (
    <View style={[styles.containerStyle(theme), containerStyle]}>
      <View style={[styles.titleContainerStyle, titleContainerStyle]}>
        <VFText
          style={[styles.titleTextStyle(theme), titleStyle]}
          i18nKey={title}
        />
        {renderRightElement ? (
          renderRightElement()
        ) : (
          <VFButton
            title={buttonText}
            style={[styles.buttonStyle(theme), buttonStyle]}
            textStyle={[styles.titleTextStyle(theme), buttonTextStyle]}
            onPress={onPress}
            disabled={disabled}
            disabledStyle={[
              styles.disabledButtonStyle(theme),
              disabledButtonStyle
            ]}
            disabledTextStyle={[
              styles.disabledButtonTextStyle,
              disabledButtonTextStyle
            ]}
            underlayColor={colors.transparentColor}
            accessibilityLabel={rightBtnAccessibilityLabel}
            {...props}
          />
        )}
      </View>

      {description ? (
        <VFText
          i18nKey={description}
          style={[styles.descriptionTextStyle(theme), descriptionStyle]}
        />
      ) : null}
    </View>
  )
}

DeveloperSettingsCardSection.defaultProps = {
  theme: LightThemeColors
}

export default DeveloperSettingsCardSection
