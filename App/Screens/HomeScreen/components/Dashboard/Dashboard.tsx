import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { VFBackground } from '@vfgroup-oneplatform/foundation/Components'
import {
  Colors,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'
import DashboardFeatureComponent from '@vfgroup-oneplatform/framework/Dashboard'

import { DashboardProps } from './dashboard.d'
import { getThemeImages } from 'App/Themes'
import styles from './dashboard.styles'

import {
  getDashboardObject,
  handleOnPressDiscoverItem,
  isDeveloperSettingsEnabled,
  removeFromDiscoveryItemsinDashboardObject
} from 'App/Screens/HomeScreen/components/Dashboard/dashboard.helpers'
import { setCurrentLogoPosition } from 'App/Services/SplashAnimationHandler/SplashAnimationHandler.helpers'
import DashboardCompList from 'App/Screens/HomeScreen/components/Dashboard/configs/dashboardCompList'

import { translate } from 'App/Utils'
import useStartSplashEndAnimation from 'App/Hooks/useStartSplashEndAnimation'
import { StoreType, ThunkStatus } from 'App/Redux/StoreType.d'
import { ScreenWrapperView } from 'App/Components'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { getFirstNameFromAppUserData } from 'App/Services/AppUserData/AppUserData.helpers'
import { store } from 'App/Redux'
import { fetchDashboardSkeleton } from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.thunk'

function Dashboard({ splashProps }: DashboardProps) {
  const { isLoading, lastLoadTimeStamp }: any = useSelector(
    ({
      dashboardSkeleton: { dashboardSkeletonLoadingStatus, lastLoadTimeStamp }
    }: StoreType) => ({
      lastLoadTimeStamp: lastLoadTimeStamp,
      isLoading: dashboardSkeletonLoadingStatus === ThunkStatus.PENDING
    })
  )

  const LogoViewRef = useRef(null)
  const theme = useTheme()
  const Images = getThemeImages(theme.name)

  useStartSplashEndAnimation({
    LogoViewRef,
    splashProps,
    screenName: Routes.HomeScreen,
    onStartSplashEndAnimation: () => {},
    handleDeeplinking: true
  })

  setCurrentLogoPosition(LogoViewRef, splashProps.setSplashLogoPosition)

  useEffect(() => {
    if (!theme.isDark) {
      splashProps.setSplashColor(Colors.vfRed)
    }
  }, [])

  return (
    <VFBackground
      type={'primary'}
      style={styles.container}
      testID={testID('DashboardImageBackground')}
    >
      <ScreenWrapperView style={styles.containerStyle}>
        <DashboardFeatureComponent
          images={Images}
          isAnimationFinished={false}
          lastUpdateTime={lastLoadTimeStamp}
          onRefresh={() => {
            store.dispatch(fetchDashboardSkeleton())
          }}
          scrollViewProps={{
            directionalLockEnabled: true,
            disableScrollViewPanResponder: true
          }}
          dashboardConfig={{
            spaceType: 0,
            discoverCardsStyle: {
              height: undefined,
              elevation: 0
            },
            dashboardData: isDeveloperSettingsEnabled
              ? getDashboardObject()
              : removeFromDiscoveryItemsinDashboardObject({
                  objectName: 'assistance',
                  itemName: 'developer_settings'
                }),
            componentList: DashboardCompList,
            dashboardAnimationStyles: [styles.innerContainer],
            isLoading: {
              dashboard: isLoading,
              discover: isLoading
            },
            handleOnPressDiscoverItem,
            discoverLoadingError: false,
            handleOnPressCard: () => {}
          }}
          EIOConfig={{
            type: 'primary',
            expandable: false,
            onChange: () => {},
            title:
              translate('eio_header_welcome_message') +
              getFirstNameFromAppUserData(),
            getLogoRef: (logoRef: any) => {
              LogoViewRef.current = logoRef
            },
            EIOData: [{}],
            subTitle: store
              .getState()
              .appUserData?.currentlyActiveSubscription?.itemSubTitle?.toString()
          }}
        />
      </ScreenWrapperView>
    </VFBackground>
  )
}

export default Dashboard
