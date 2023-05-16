import React, { useState } from 'react'
import ProductsAndServices from '@vfgroup-oneplatform/framework/ProductsAndServices'

import { User_Types } from '@vfgroup-oneplatform/foundation/Utils/UserTypes.Enum'

import { useDispatch } from 'react-redux'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { useRoute } from '@react-navigation/native'

import styles from './ProductsAndServices.styles'

import { getTotalAmount } from './ProductsAndServices.helpers'

import {
  ProductsAndServicesMobilePostpaidTabs,
  ProductsAndServicesMobilePrepaidTabs,
  ProductsAndServicesVFScreenProps
} from './ProductsAndServicesScreen.configs'

import { Images, getThemeImages } from 'App/Themes'

import { showTopUpMethodsModal } from 'App/Screens/TopUpScreens/TopUpMethodsScreen/TopUpMethodsScreen.helpers'

import {
  getFirstNameFromAppUserData,
  getMsisdn
} from 'App/Services/AppUserData/AppUserData.helpers'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { fetchAddons } from 'App/Redux/Addons/addons.thunk'
import { fetchMyPlan } from 'App/Redux/myplan/myPlan.thunk'
import { useApiCall } from 'App/Hooks'
import { NavigationFunctions } from 'App/Containers'

const ProductsAndServicesScreen = () => {
  const {
    params: { isMobilePostpaidSubscription }
  } = useRoute<any>()
  const dispatch = useDispatch()
  const [lastUpdateDate, setLastUpdateDate] = useState(new Date())
  const theme = useTheme()
  const {
    responseData: totalAmount,
    refresh: refreshTotalAmount,
    isLoading: isTotalAmountLoading
  } = useApiCall(getTotalAmount)

  const onRefresh = async () => {
    try {
      if (isMobilePostpaidSubscription) {
        dispatch(fetchMyPlan())
      } else {
        dispatch(fetchAddons())
      }
      setLastUpdateDate(new Date())
    } catch (error) {
      throw error
    }
    refreshTotalAmount()
  }

  return (
    <>
      {isMobilePostpaidSubscription ? (
        <ProductsAndServices
          testID={testID('productsAndServicesScreen')}
          renderTopUp={() => <></>}
          lastUpdateTime={lastUpdateDate}
          userType={User_Types.PAY_M}
          vfScreenProps={{
            ...ProductsAndServicesVFScreenProps,
            subHeaderTitle: 'products_and_services_sub_header_title_paym',
            title: getFirstNameFromAppUserData(),
            subHeaderSubTitle: totalAmount,
            subHeaderDescription: getMsisdn().toString(),
            subHeaderAfterSubTitle:
              'products_and_services_sub_header_after_subtitle_paym',
            onClose: NavigationFunctions.popToTop,
            subHeaderSubTitleStyle: styles.subHeaderSubTitleStyle
          }}
          tabs={Object.values(ProductsAndServicesMobilePostpaidTabs)}
          onRefresh={onRefresh}
          images={{ ...Images, ...getThemeImages(theme.name) }}
          isHeaderLoading={isTotalAmountLoading}
        />
      ) : (
        <ProductsAndServices
          testID={testID('productsAndServicesScreen')}
          renderTopUp={() => <></>}
          lastUpdateTime={lastUpdateDate}
          userType={User_Types.PAY_G}
          topUpProps={{
            onTopUpButtonPress: showTopUpMethodsModal
          }}
          vfScreenProps={{
            ...ProductsAndServicesVFScreenProps,
            subHeaderTitle: 'products_and_services_sub_header_title_payg',
            title: getFirstNameFromAppUserData(),
            subHeaderSubTitle: totalAmount,
            subHeaderDescription: getMsisdn().toString(),
            subHeaderAfterSubTitle:
              'products_and_services_sub_header_after_subtitle_payg',
            onClose: NavigationFunctions.popToTop,
            subHeaderSubTitleStyle: styles.subHeaderSubTitleStyle
          }}
          tabs={Object.values(ProductsAndServicesMobilePrepaidTabs)}
          onRefresh={onRefresh}
          images={{ ...Images, ...getThemeImages(theme.name) }}
          isHeaderLoading={isTotalAmountLoading}
        />
      )}
    </>
  )
}

export default ProductsAndServicesScreen
