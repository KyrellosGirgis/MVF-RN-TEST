import React from 'react'

interface BreakdownSection {
  title: string
  description: string
  items: SectionItem[]
}

interface TextSectionContent {
  paragraphs?: string[]
  bullets?: string[]
  info?: string[][]
  breakdown?: BreakdownSection[]
}

export interface SectionItem {
  title: string
  description?: string
  icon?: string
  renderDescription?: () => React.ReactNode
}

export type PrivacySettingsState = {
  [key: string]: boolean
}

export interface TextSection {
  content?: TextSectionContent
  moreContent?: TextSectionContent
}

export interface ContactPreferencesSection {
  hasParentPermission: boolean
  parentPermissionTitle: string
  items: SectionItem[]
}

export interface PrivacyOverview {
  subTitle: string
  descriptionSection: TextSection
  advancedPermissionChildren: SectionItem[]
  singlePermissionsList: SectionItem[]
}
