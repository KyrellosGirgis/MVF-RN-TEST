import React from 'react'

export type DeveloperSettingsCardPropTypes = {
  title: string
  icon: string
  iconType: string
  iconSize: number
  iconColor: string
  iconContainerStyle: Object
  iconStyle: Object
  childContainerStyle: Object
  children: React.ReactNode
  titleTestID: string
  renderRightElement: () => React.ReactNode
}
