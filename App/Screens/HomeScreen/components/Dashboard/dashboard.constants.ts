/* eslint-disable import/exports-last */
export const DISCOVER_SECTIONS_TYPES = {
  VOV: 'VoV',
  NAVIGATION: 'Navigation',
  OFFERS: 'Offers',
  NAVIGATION_WITH_IMAGE: 'NavigationWithImage'
}

export const DISCOVER_UI_SECTIONS_TYPES = {
  VOV: 'discover_fixed_component',
  NAVIGATION: 'group',
  OFFERS: 'Offers',
  APPS: 'apps',
  NAVIGATION_WITH_IMAGE: 'NavigationWithImage'
}

export const DISCOVER_SECTIONS_COMPONENT_ID = {
  VOV: 'VovCard',
  NAVIGATION: 'discoverComponentCard',
  OFFERS: 'Offers',
  NAVIGATION_BASIC: 'demo-component'
}

export const NAVIGATION_STYLE_TYPE = {
  BASIC: 'basic',
  FRAMED_WITH_IMAGE: 'framedWithImage',
  FRAMED_NO_IMAGE: 'framedNoImage'
}

const CARD_TYPES_VALUES = {
  VOV: DISCOVER_SECTIONS_COMPONENT_ID.VOV,
  OFFERS: DISCOVER_SECTIONS_COMPONENT_ID.OFFERS
}
type KeysOfCardTypes = keyof typeof CARD_TYPES_VALUES
export type cardTypes = typeof CARD_TYPES_VALUES[KeysOfCardTypes]
