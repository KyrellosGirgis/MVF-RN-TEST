import React from 'react'
import { View } from 'react-native'
import { VFText, Icon } from '@vfgroup-oneplatform/foundation/Components'
import {
  LightThemeColors,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './DeveloperSettingsCard.styles'

import { DeveloperSettingsCardPropTypes } from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard.d'

const DeveloperSettingsCard = ({
  title,
  icon,
  iconType,
  iconSize,
  iconColor,
  iconStyle,
  children,
  renderRightElement,
  childContainerStyle,
  iconContainerStyle,
  titleTestID
}: DeveloperSettingsCardPropTypes) => {
  const theme = useTheme()

  return (
    <View style={styles.containerStyle(theme)}>
      <View style={styles.headerContainerStyle}>
        <View style={iconContainerStyle}>
          <Icon
            name={icon}
            type={iconType}
            size={iconSize}
            color={iconColor}
            style={iconStyle}
          />
        </View>
        <VFText
          style={styles.title(theme)}
          i18nKey={title}
          testKey={titleTestID}
        />
        {renderRightElement()}
      </View>
      {children ? (
        <View style={[styles.childContainerStyle(theme), childContainerStyle]}>
          {children}
        </View>
      ) : null}
    </View>
  )
}
DeveloperSettingsCard.defaultProps = {
  iconSize: 32,
  renderRightElement: () => {},
  theme: LightThemeColors
}

export default DeveloperSettingsCard
