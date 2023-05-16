import React, { useState, useRef } from 'react'
import { View, FlatList } from 'react-native'
import { VFText, VFButton } from '@vfgroup-oneplatform/foundation/Components'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import CustomTabs, {
  CustomTab
} from '@vfgroup-oneplatform/framework/CommonUI/CustomTabs'

import styles from './AutoTopUpInfoScreen.styles'

import { isActive } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen.helpers'
import { TOPUP_TAB_TYPES } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen.constants'
import AutoTopUpInfoBody from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/components/AutoTopUpInfoBody'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const AutoTopupInfoScreen = () => {
  const theme = useTheme()
  const [selectedTab, setSelectedTab] = useState(TOPUP_TAB_TYPES.COMFORT_TOPUP)
  const flatListRef = useRef<FlatList>(null)

  const onTapChanged = (tabID: TOPUP_TAB_TYPES) => {
    setSelectedTab(tabID)
    flatListRef.current?.scrollToIndex({ index: 0, animated: false })
  }

  const AutoTopUpInfoHeader = (
    <>
      <VFText
        style={styles.QASubTitle}
        i18nKey="auto_topup_quick_action_subtitle"
        type="primary"
        testKey={testID('autoTopupOverlaySubtitle')}
      />
      <VFText
        i18nKey="auto_topup_quick_action_section_title"
        type="primary"
        style={styles.sectionTitle(theme)}
        testKey={testID('autoTopupOverlaySection')}
      />

      <CustomTabs
        selectedTab={selectedTab}
        onPress={onTapChanged}
        containerStyle={styles.tabsContainer}
        testID={testID('autoTopupOverlayTabsContainer')}
      >
        <CustomTab
          value={TOPUP_TAB_TYPES.COMFORT_TOPUP}
          style={
            !isActive(selectedTab, TOPUP_TAB_TYPES.COMFORT_TOPUP)
              ? styles.inActive
              : null
          }
          testID={testID('autoTopupOverlayTab')}
          textStyle={
            !isActive(selectedTab, TOPUP_TAB_TYPES.COMFORT_TOPUP)
              ? styles.customTapTextStyle
              : null
          }
        >
          {'auto_topup_quick_action_tabs_first_title'}
        </CustomTab>

        <CustomTab
          value={TOPUP_TAB_TYPES.AUTO_TOPUP}
          style={
            !isActive(selectedTab, TOPUP_TAB_TYPES.AUTO_TOPUP)
              ? styles.inActive
              : null
          }
          testID={testID('autoTopupOverlayTab')}
          textStyle={
            !isActive(selectedTab, TOPUP_TAB_TYPES.AUTO_TOPUP)
              ? styles.customTapTextStyle
              : null
          }
        >
          {'auto_topup_quick_action_tabs_second_title'}
        </CustomTab>
      </CustomTabs>
    </>
  )

  const AutoTopUpInfoFooter = (
    <View
      style={styles.footerContainer}
      testID={testID('autoTopupOverlayFooter')}
    >
      <View
        style={styles.separator}
        testID={testID('autoTopupOverlayFooterSeparator')}
      />

      <VFText
        i18nKey="auto_topup_quick_action_footer_text"
        style={styles.footerText}
        testKey={testID('autoTopupOverlayFooterText')}
      />

      <VFButton
        title="auto_topup_quick_action_footer_btn"
        type="secondary"
        style={styles.footerBtn(theme)}
        testID={testID('autoTopupOverlayFooterButton')}
      />
    </View>
  )

  return (
    <View
      style={styles.QAContainer}
      testID={testID('autoTopupOverlayContainer')}
    >
      {AutoTopUpInfoHeader}
      <AutoTopUpInfoBody selectedTab={selectedTab} flatListRef={flatListRef} />
      {AutoTopUpInfoFooter}
    </View>
  )
}

export default AutoTopupInfoScreen
