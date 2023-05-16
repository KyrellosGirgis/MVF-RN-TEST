import React from 'react'

import { Icon, VFText } from '@vfgroup-oneplatform/foundation/Components'

import { ImageStyle, View, ViewStyle } from 'react-native'

import styles from 'App/Components/TextWithIconView/TextWithIconView.styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'

type TextWithIconViewProps = {
  title: string
  icon: any
  iconStyle: ImageStyle
  containerStyle?: ViewStyle
  testId: string
}

const TextWithIconView = ({
  title,
  icon,
  iconStyle,
  containerStyle,
  testId
}: TextWithIconViewProps) => {
  return (
    <View
      style={[styles.textWithIconViewTitleWrapper, containerStyle]}
      testID={testID(`${testId}Wrapper_view`)}
    >
      <Icon
        style={iconStyle}
        name={icon}
        type="image"
        testID={testID(`${testId}Icon_img`)}
      />
      <VFText
        type="primary"
        style={styles.textWithIconViewTitle}
        i18nKey={title}
        testID={testID(`${testId}Title_txt`)}
      />
    </View>
  )
}
export default TextWithIconView
