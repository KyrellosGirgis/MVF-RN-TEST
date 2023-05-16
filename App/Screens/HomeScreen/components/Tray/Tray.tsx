import React, { useEffect, useState } from 'react'
import { Logout } from '@vfgroup-oneplatform/framework/CommonUI'
import VFLottieLoadingScreen from '@vfgroup-oneplatform/foundation/Components/VFLottieLoadingScreen'

import { TrayProps } from './Tray.d'

import { useMainTrayConfiguration } from './Tray.hooks'

import { addAirShipInboxUpdatingListener } from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirship.helpers'
import logOutHandler from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import { testID } from 'App/Utils/Helpers/testId.helpers'

function Tray({ withTrayProps }: TrayProps) {
  const { setTrayConfig, setTrayVisable: setTrayVisible } = withTrayProps
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false)
  const [
    isSwitchingSubscriptionInProgress,
    setIsSwitchingSubscriptionInProgress
  ] = useState(false)
  const [switchingToSubscriptionName, setSwitchingToSubscriptionName] =
    useState('')
  const [notExpiredUnreadMessagesLength, setNotExpiredUnreadMessagesLength] =
    useState(0)

  useMainTrayConfiguration({
    setTrayConfig,
    setTrayVisible,
    isLogoutModalVisible,
    setIsLogoutModalVisible,
    isSwitchingSubscriptionInProgress,
    setIsSwitchingSubscriptionInProgress,
    setSwitchingToSubscriptionName,
    notExpiredUnreadMessagesLength
  })

  async function logoutAction() {
    setIsLogoutModalVisible(false)
    logOutHandler()
  }

  useEffect(() => {
    setTrayVisible(!isLogoutModalVisible)
  }, [isLogoutModalVisible])

  useEffect(() => {
    const airShipInboxUpdatingListener = addAirShipInboxUpdatingListener(
      setNotExpiredUnreadMessagesLength
    )
    return () => airShipInboxUpdatingListener.remove()
  }, [])

  return (
    <>
      {isLogoutModalVisible && (
        <Logout
          toggleModal={() => {
            setIsLogoutModalVisible(!isLogoutModalVisible)
          }}
          isVisible={isLogoutModalVisible}
          logout={logoutAction}
          closeModal={() => {
            setIsLogoutModalVisible(false)
          }}
        />
      )}

      <VFLottieLoadingScreen
        isVisible={isSwitchingSubscriptionInProgress}
        title="switch_product_loading_screen_title"
        subTitle={switchingToSubscriptionName}
        testID={testID('switch_product_loading_screen')}
      />
    </>
  )
}

export default Tray
