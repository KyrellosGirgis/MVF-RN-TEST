import React from 'react'
import { TABS_LABELS } from '@vfgroup-oneplatform/framework/ProductsAndServices/Utils/Enums'

import MyPlanTab from './components/MyPlanTab/MyPlanTab'

import BalanceTab from './components/BalanceTab/BalanceTab'

import AddonsTab from './components/AddonsTab/AddonsTab'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const ProductsAndServicesMobilePostpaidTabs = {
  myPlan: {
    key: TABS_LABELS.MY_PLAN,
    tab_key: 'my_plan_screen_title',
    accessibilityLabel: testID('tabText'),
    renderTabContent: () => <MyPlanTab />
  },
  addOns: {
    key: TABS_LABELS.ADDONS,
    tab_key: 'addons_screen_title',
    accessibilityLabel: testID('tabText'),
    renderTabContent: () => <></>
  }
}

const ProductsAndServicesMobilePrepaidTabs = {
  balance: {
    key: TABS_LABELS.BALANCE,
    tab_key: 'balance_screen_title',
    renderTabContent: () => <BalanceTab />
  },
  addOns: {
    key: TABS_LABELS.ADDONS,
    tab_key: 'addons_screen_title',
    renderTabContent: () => <AddonsTab />
  },
  usage: {
    key: TABS_LABELS.USAGE,
    tab_key: 'usage_screen_title',
    renderTabContent: () => <></>
  }
}

const ProductsAndServicesVFScreenProps = {
  withSubHeader: true,
  titleTextAccessibilityLabel: testID('productsAndServicesHeaderTitle'),
  subHeaderTitleAccessibilityLabel: testID('productsAndServicesTitle'),
  subHeaderSubTitleAccessibilityLabel: testID('productsAndServicesAmount'),
  subHeaderAfterSubTitleAccessibilityLabel: testID(
    'productsAndServicesAfterAmount'
  ),
  subHeaderDescriptionAccessibilityLabel: testID('productsAndServicesMsisdn'),
  closeButtonTestID: testID('productsAndServicesClosIcon'),
  clearStatusBarEntries: false
}

export {
  ProductsAndServicesMobilePostpaidTabs,
  ProductsAndServicesMobilePrepaidTabs,
  ProductsAndServicesVFScreenProps
}
