import React, { useEffect, useState } from 'react'
import { Balance } from '@vfgroup-oneplatform/framework/Balance'
import { VFBanner } from '@vfgroup-oneplatform/foundation/Components'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { useDispatch, useSelector } from 'react-redux'

import {
  filterHistory,
  isAutoTopUpActivated,
  shouldShowAutoTopUpBanner,
  shouldShowAutoTopUpCard
} from './BalanceTab.helpers'

import { Images, getThemeImages } from 'App/Themes'

import { DateFilterPeriod } from './screens/BalanceHistoryFilterCalendar/BalanceHistoryFilterCalendar.d'

import { setCalendarLocale } from './screens/BalanceHistoryFilterCalendar/BalanceHistoryFilterCalendar.locales'

import AutoTopupInfoIcon from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/components/AutoTopupInfoIcon/AutoTopupInfoIcon'
import {
  activateAutoTopUpCardProps,
  AUTO_TOPUP_STATUS,
  inactivateAutoTopUpCardProps,
  preSelectedAmountForSetupAutoTopup,
  notRegisteredAutoTopUpBannerProps
} from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.constants'
import useApiCall from 'App/Hooks/useApiCall'
import webURLs from 'App/Services/webURLs'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import {
  getAutoTopupStatus,
  updateAutoTopupStatus
} from 'App/Services/API/Requests/AutoTopUp/AutoTopUp.requests'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import { fetchBalance } from 'App/Redux/Balance/balance.thunk'

const BalanceTab = () => {
  setCalendarLocale()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { history, dataLoadingStatus } = useSelector(
    (state: any) => state.balance
  )

  const [dateFilterPeriod, setDateFilterPeriod] = useState({})
  const [balanceHistory, setBalanceHistory] = useState(history)
  const [autoTopupStatus, setAutoTopupStatus] = useState<string>('')
  const { responseData, refresh, isLoading } = useApiCall(getAutoTopupStatus)

  useEffect(() => {
    setAutoTopupStatus(responseData)
  }, [responseData])

  const openBalanceHistoryFilterCalendar = (
    dateFilterPeriod: DateFilterPeriod
  ) => {
    NavigationFunctions.navigate(Routes.BalanceHistoryFilterCalendarScreen, {
      onApplyCalendarFilter,
      dateFilterPeriod
    })
  }

  const onApplyCalendarFilter = (dateFilterPeriod: DateFilterPeriod) => {
    setDateFilterPeriod(dateFilterPeriod)
  }

  const getBalanceFilteredData = (startDate: string, endDate: string) => {
    setBalanceHistory(
      filterHistory({ originalData: history, startDate, endDate })
    )
  }

  const getAutoTopUpCardProps = () => {
    const isAutoTopUActive = isAutoTopUpActivated(autoTopupStatus)
    return {
      ...(isAutoTopUActive
        ? activateAutoTopUpCardProps
        : inactivateAutoTopUpCardProps),
      onButtonPress: () => {
        openWebView(webURLs.editTopUpUrl, true, refresh)
      },
      onToggleActiveStatus: () => {
        onAutoTopupToggleChange(isAutoTopUActive)
      }
    }
  }

  const onSetupAutoTopupButtonPress = () => {
    const topUpURL = webURLs.topUpURL(preSelectedAmountForSetupAutoTopup)
    openWebView(topUpURL, true, refresh)
  }

  const onAutoTopupToggleChange = async (isAutoTopUpActivated: boolean) => {
    //TODO(handle loading state )
    try {
      await updateAutoTopupStatus(
        isAutoTopUpActivated
          ? AUTO_TOPUP_STATUS.DEACTIVATE
          : AUTO_TOPUP_STATUS.ACTIVATE
      )
      setAutoTopupStatus(
        isAutoTopUpActivated
          ? AUTO_TOPUP_STATUS.DEACTIVATE
          : AUTO_TOPUP_STATUS.ACTIVATE
      )
    } catch (error) {
      setAutoTopupStatus(AUTO_TOPUP_STATUS.ERROR)
      //TODO(handle Error state )
    }
  }

  return (
    <>
      {shouldShowAutoTopUpBanner(autoTopupStatus, isLoading) && (
        <VFBanner
          {...notRegisteredAutoTopUpBannerProps}
          onPrimaryButtonPress={onSetupAutoTopupButtonPress}
          renderRightComponent={AutoTopupInfoIcon} // for title
        />
      )}
      <Balance
        withCategories={false}
        images={{ ...Images, ...getThemeImages(theme.name) }}
        isError={dataLoadingStatus === ThunkStatus.REJECTED}
        isLoading={dataLoadingStatus === ThunkStatus.PENDING}
        onTryAgainPress={() => {
          dispatch(fetchBalance())
        }}
        balanceData={balanceHistory}
        getBalanceData={() => {
          setBalanceHistory(history)
        }}
        getBalanceFilteredData={getBalanceFilteredData}
        onBalanceHistoryDatesPress={openBalanceHistoryFilterCalendar}
        dateFilterPeriod={dateFilterPeriod}
        testID={testID('balanceTabId')}
        withAutoTopUpCard={shouldShowAutoTopUpCard(autoTopupStatus)}
        autoTopUpCardProps={getAutoTopUpCardProps()}
      />
    </>
  )
}

export default BalanceTab
