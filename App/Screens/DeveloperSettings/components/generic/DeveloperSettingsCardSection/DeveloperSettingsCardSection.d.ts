import React from 'react'

export type DeveloperSettingsCardSectionTypes = {
  title: string
  buttonText: string
  description: string
  renderRightElement: () => React.ReactNode
  onPress: () => React.ReactNode
  disabled: boolean
  containerStyle: Object
  titleContainerStyle: Object
  titleStyle: Object
  descriptionStyle: Object
  buttonStyle: Object
  buttonTextStyle: Object
  disabledButtonStyle: Object
  rightBtnAccessibilityLabel: string
  disabledButtonTextStyle: Object
}
