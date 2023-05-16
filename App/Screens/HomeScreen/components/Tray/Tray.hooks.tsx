import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import { TRAY_TYPES } from '@vfgroup-oneplatform/framework/Dashboard/Tray'

import { TRAY_TABS } from './Tray.constants'
import { getTrayData } from './Tray.data'
import {
  navigateToChangePasswordScreen,
  navigateToAddressesOverviewScreen,
  selectAndMapSomeAppUserData
} from './Tray.helpers'
import { getThemeImages, Images } from 'App/Themes'
import styles from './Tray.styles'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { store, StoreType } from 'App/Redux'
import { WindowDimenions } from 'App/Utils/RNNativeModules/generic.RNNativeModules'
import { getFirstNameFromAppUserData } from 'App/Services/AppUserData/AppUserData.helpers'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import { fetchUnbilledUsages } from 'App/Redux/Usages/usages.thunk'
import { switchUserProductData } from 'App/Redux/AppUserData/appUserData.thunk'
import { handleDeeplinkingWhenAppIsOpened } from 'App/Services/Deeplinks/Deeplinks.helper'

interface UseMainTrayConfiguration {
  setTrayConfig: (trayType: string, config: object) => void
  setTrayVisible: (value: boolean) => void
  isLogoutModalVisible: boolean
  setIsLogoutModalVisible: (value: boolean) => void
  isSwitchingSubscriptionInProgress: boolean
  setIsSwitchingSubscriptionInProgress: (value: boolean) => void
  setSwitchingToSubscriptionName: (name: string) => void
  notExpiredUnreadMessagesLength: number
}

const useMainTrayConfiguration = (props: UseMainTrayConfiguration) => {
  const {
    setTrayConfig,
    setTrayVisible,
    isLogoutModalVisible,
    setIsLogoutModalVisible,
    setIsSwitchingSubscriptionInProgress,
    setSwitchingToSubscriptionName,
    notExpiredUnreadMessagesLength
  } = props
  const theme = useTheme()

  const { dashboardSkeletonLoadingStatus } = useSelector(
    (state: StoreType) => state.dashboardSkeleton
  )

  const { userAccountVBO, isLoading } = useSelector(selectAndMapSomeAppUserData)

  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedTrayItem, setSelectedTrayItem] = useState('')

  const toggleModal = (isVisible: boolean = !isModalVisible) => {
    setModalVisible(isVisible)
  }

  const onPressProduct = async (subTrayItem: any) => {
    setSwitchingToSubscriptionName(subTrayItem.itemSubTitle)
    setIsSwitchingSubscriptionInProgress(true)

    await store.dispatch(switchUserProductData(subTrayItem))
    await store.dispatch(fetchUnbilledUsages())

    setTimeout(() => {
      setIsSwitchingSubscriptionInProgress(false)
    }, 2000)
  }

  const handlePressSubTrayItems = (subTrayItem: { itemTitle: string }) => {
    switch (subTrayItem.itemTitle) {
      case 'logout_title':
        setTrayVisible(false)
        setIsLogoutModalVisible(!isLogoutModalVisible)
        return
      case 'subtray_privacy_title':
        NavigationFunctions.navigate(Routes.PrivacySettings)
        return
      case 'settings_title':
        NavigationFunctions.navigate(Routes.Settings)
        return
      case 'messages_section_title':
        NavigationFunctions.navigate(Routes.MessageCenterScreen)
        return
      case 'my_password_title':
        navigateToChangePasswordScreen(userAccountVBO.authLevel)
        return
      case 'addresses_section_title':
        navigateToAddressesOverviewScreen()
        return
      default:
        onPressProduct(subTrayItem)
        return
    }
  }

  const configureMainTray = () => {
    const trayData = getTrayData({
      userAccountVBO,
      isLoading
    })

    setTrayConfig(TRAY_TYPES.MAIN, {
      // data to render tray items
      data: trayData,

      // to handle lock of sub tray items
      isSubTrayItemsLocked: false, // we can remove it because the default on core is false

      // used in animatation view which wrapping trayHoc or our trayView
      trayAnimationStyles: [
        styles.trayAnimatedView,
        isModalVisible ? { height: WindowDimenions.height } : null
      ],

      // to show the notification number on cards
      notificationsCount: {
        tray_accounts_section_title: {
          messages_section_title: notExpiredUnreadMessagesLength
        }
      },

      // on tray item (my products, account) clicked will select the item then hide the tray
      onPressTrayItem: (item, toggleModalCallback) => {
        switch (item.subTrayID) {
          case 'account':
          case 'products':
            setSelectedTrayItem(item?.subTrayID)
            toggleModalCallback()
            break
          default:
            handleDeeplinkingWhenAppIsOpened(item.action)
            break
        }
      },

      // what are we gonna do when we click on sub item
      onPressSubTrayItems: handlePressSubTrayItems,

      // place holder to render it in description tray card item
      trayPlaceHolders: {
        logout_subtitle: [getFirstNameFromAppUserData()],
        messages_item_subtitle_new_unread: [`${notExpiredUnreadMessagesLength}`]
      },

      // used in some components but without everything is working fine
      images: { ...Images, ...getThemeImages(theme.name) },

      // show modal or not
      isModalVisible: isModalVisible,

      // to toggle modal show and hidden
      toggleModal: toggleModal,

      // TrayComponentList: null, // not need it because
      isLoadingError:
        !isLoading &&
        !userAccountVBO &&
        selectedTrayItem === TRAY_TABS.PRODUCT_TAB,

      // object to error component
      errorConfig: {
        data: {},
        onTryAgainPress: () => {}
      },

      // style for sub tray card container
      subTrayCardsContainerStyle: styles.subTrayCardsContainerStyle,

      // to handle sub tray footer
      renderSubTrayFooter: () => <></>, // it is okay if we don't pass it because core check on it if a function or not

      trayIcon: undefined, // we don't need it because the default value is null

      // to handle Sub tray item description lines view
      subTraySubTitleProps: { numberOfLines: 1 }
    })
  }

  useEffect(() => {
    if (dashboardSkeletonLoadingStatus !== ThunkStatus.PENDING) {
      configureMainTray()
    }
  }, [
    isModalVisible,
    userAccountVBO,
    selectedTrayItem,
    isLoading,
    notExpiredUnreadMessagesLength,
    isLogoutModalVisible,
    dashboardSkeletonLoadingStatus
  ])
}

export { useMainTrayConfiguration }
