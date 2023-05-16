import Config from 'react-native-config'

import _ from 'lodash'

import PermissionsManager from '@vfgroup-oneplatform/foundation/PermissionsManager'

import { IOSPermissionTypes } from '@vfgroup-oneplatform/foundation/PermissionsManager/permissionTypes'

import {
  cardTypes,
  DISCOVER_SECTIONS_COMPONENT_ID,
  DISCOVER_SECTIONS_TYPES,
  DISCOVER_UI_SECTIONS_TYPES,
  NAVIGATION_STYLE_TYPE
} from 'App/Screens/HomeScreen/components/Dashboard/dashboard.constants'

import { store } from 'App/Redux'
import dashboardConfigJSON from 'App/Screens/HomeScreen/components/Dashboard/configs/dashboard.config'
import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { webURLs } from 'App/Services'

import {
  DashboardSection,
  DashboardSectionItem
} from 'App/Services/DataLayer/APIs/Dashboard/DashboardSkeleton/DashboardSkeleton.d'
import { handleDeeplinkingWhenAppIsOpened } from 'App/Services/Deeplinks/Deeplinks.helper'

const getVOVCardData = (section: DashboardSection) => {
  // TODO :: replace test data
  const { title, content } = section
  const vovTestItem = {
    action: content?.href,
    extraInfo: {
      title: title,
      image: {
        uri: 'https://media.vodafone.de/www/images/app/benefit_world/icon_discount_640dpi.png'
      }
    }
  }
  return {
    type: DISCOVER_UI_SECTIONS_TYPES.VOV,
    componentId: DISCOVER_SECTIONS_COMPONENT_ID.VOV,
    data: [vovTestItem, vovTestItem, vovTestItem]
  }
}

const getCardData = (section: DashboardSection, type: cardTypes) => {
  const { title, content, image } = section
  return {
    type,
    action: content?.href,
    componentId: DISCOVER_SECTIONS_COMPONENT_ID.VOV,
    extraInfo: {
      title: title,
      image: image
    }
  }
}

const getNavigationCardData = (section: DashboardSection) => {
  const { title, style, items, image } = section
  const sharedProps = {
    moreText: 'dashboard_group_component_show_more',
    lessText: 'dashboard_group_component_show_less'
  }
  if (
    style === NAVIGATION_STYLE_TYPE.FRAMED_NO_IMAGE ||
    style === NAVIGATION_STYLE_TYPE.FRAMED_WITH_IMAGE
  ) {
    return {
      title,
      cardImageSource: image?.href,
      componentId: DISCOVER_SECTIONS_COMPONENT_ID.NAVIGATION,
      items: items?.map((item: DashboardSectionItem) => {
        const { label, icon, action, buttonLabel } = item
        return {
          buttonText: buttonLabel,
          onPress: () => {
            handleDeeplinkingWhenAppIsOpened(action.href)
          },
          action: action?.href,
          extraInfo: {
            title: label,
            Icon: { uri: icon?.href }
          }
        }
      }),
      ...sharedProps
    }
  } else if (style === NAVIGATION_STYLE_TYPE.BASIC) {
    return {
      name: title,
      type: 'group',
      componentId: DISCOVER_SECTIONS_COMPONENT_ID.NAVIGATION_BASIC,
      subItems: items?.map((item: DashboardSectionItem) => {
        const { label, icon, action } = item
        return {
          screen: action?.href,
          extraInfo: {
            title: label,
            Icon: icon.href
          }
        }
      }),
      ...sharedProps
    }
  }
}

const DISCOVER_SECTIONS_MAPPINGS = {
  [DISCOVER_SECTIONS_TYPES.VOV]: (section: DashboardSection) =>
    getVOVCardData(section),
  [DISCOVER_SECTIONS_TYPES.NAVIGATION]: getNavigationCardData,
  [DISCOVER_SECTIONS_TYPES.OFFERS]: (section: DashboardSection) =>
    getCardData(section, DISCOVER_UI_SECTIONS_TYPES.OFFERS)
}

const getDiscoverSectionsSkeleton = () => {
  const { sections } = store.getState().dashboardSkeleton || {}
  return sections
    ?.map((section) => DISCOVER_SECTIONS_MAPPINGS[section.type](section))
    .reverse()
}

const isDeveloperSettingsEnabled = Config.ENABLE_DEVELOPER_SETTINGS === 'true'

const removeFromDiscoveryItemsinDashboardObject = ({
  objectName,
  itemName
}: {
  objectName: string
  itemName: string
}) => {
  const clonnedObject = _.cloneDeep(dashboardConfigJSON)

  const objectToDeleteFrom =
    clonnedObject[1]?.discoveryItems?.find((item) =>
      item?.name.includes(objectName)
    ) || {}

  objectToDeleteFrom.subItems = objectToDeleteFrom?.subItems?.filter(
    (item) => !item?.extraInfo?.title.includes(itemName)
  )

  return clonnedObject
}

const addDiscoveryItemsinDashboardObject = (clonnedObject: any, items: any) => {
  items?.forEach((item: any) => {
    clonnedObject[1]?.discoveryItems?.unshift(item)
  })
  return clonnedObject
}

const getDashboardObject = () => {
  var clonnedObject = _.cloneDeep(dashboardConfigJSON)
  const items = exports.getDiscoverSectionsSkeleton()
  return addDiscoveryItemsinDashboardObject(clonnedObject, items)
}

const DiscoverItemsNavigation: any = {
  settings_title: () => NavigationFunctions.navigate(Routes.Settings),
  dashboard_developer_settings_item_title: () =>
    NavigationFunctions.navigate(Routes.DeveloperSettingsScreen),
  dashboard_my_basket_item_title: () => openWebView(webURLs.serviceURL, true),
  dashboard_speed_checker_item_title: () =>
    NavigationFunctions.navigate(Routes.SpeedCheckerScreen)
}

const requestAppTrackingPermission = async () => {
  const permissionList = {
    [IOSPermissionTypes.APP_TRACKING_TRANSPARENCY]: true
  }
  const permissionsManager = new PermissionsManager()
  await permissionsManager.requestPermissions({}, permissionList)
}

const handleOnPressDiscoverItem = ({ extraInfo, screen }) => {
  extraInfo && extraInfo.title in DiscoverItemsNavigation
    ? DiscoverItemsNavigation[
        extraInfo?.title as keyof typeof DiscoverItemsNavigation
      ]()
    : handleDeeplinkingWhenAppIsOpened(screen)
}

export {
  removeFromDiscoveryItemsinDashboardObject,
  isDeveloperSettingsEnabled,
  DiscoverItemsNavigation,
  requestAppTrackingPermission,
  handleOnPressDiscoverItem,
  getDashboardObject,
  getDiscoverSectionsSkeleton
}
