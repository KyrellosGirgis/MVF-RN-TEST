import React, { useEffect, useState } from 'react'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import {
  TimelineEvents,
  Toggle,
  VFButton,
  VFText
} from '@vfgroup-oneplatform/foundation/Components'

import { TouchableWithoutFeedback, View } from 'react-native'

import Accordion from '@vfgroup-oneplatform/foundation/Components/Timeline/Accordion/Accordion'

import styles from './ThirdPartyPermissionsStep.styles'

import { getThirdPartyPermissionsWithDefaultValue } from './ThirdPartyPermissionsStep.helper'

import { permissionItems } from './ThirdPartyPermissionsStep.constants'

import { ThirdPartyPermissionItem } from './ThirdPartyPermissionsStep.d'

import { HtmlRenderer } from 'App/Components'

import {
  setToBiProps,
  showErrorAlert
} from 'App/Screens/OnBoarding/Components/Helper'

import { OnboardingStep } from 'App/Screens/OnBoarding/Configurations/OnboardingStep.d'
import { translate } from 'App/Utils'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { Permission } from 'App/Services/API/Requests/ThirdPartyPermissions/info/info.d'
import { saveInfoToBE } from 'App/Services/API/Requests/ThirdPartyPermissions/info/info'
import {
  hideBlurView,
  showBlurView
} from 'App/Containers/AppNavigation/AppNavigation.helpers'
import { storePermissions } from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.helper'

const ThirdPartyPermissionsStep = (props: OnboardingStep) => {
  const { isActive, onNextStep } = props
  const theme = useTheme()
  const [activeSections, setActiveSections] = useState<number[]>([])
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [permissionsStatus, setPermissionsStatus] = useState(
    getThirdPartyPermissionsWithDefaultValue(false)
  )

  useEffect(() => {
    TimelineEvents.subscribe((value) => setToBiProps(value, props))
  }, [isActive])

  const onToggleChange = (value: boolean, permissionKey: string) => {
    setPermissionsStatus({ ...permissionsStatus, [permissionKey]: value })
  }

  const getPermissions = () =>
    isCollapsed
      ? getThirdPartyPermissionsWithDefaultValue(true)
      : permissionsStatus

  const onContinuePress = async () => {
    showBlurView({ showSpinner: true, opacity: 0.8 })
    const permissions: Permission = getPermissions()

    try {
      await saveInfoToBE(permissions)
      storePermissions(permissions)
      onNextStep()
    } catch (error) {
      showErrorAlert(onNextStep)
    }
    hideBlurView()
  }

  const onAccordionToggle = () => {
    setActiveSections(!isCollapsed ? [] : [0])
    setIsCollapsed(!isCollapsed)
  }

  const ThirdPartyPermissionsHeader = () => (
    <HtmlRenderer
      source={translate('onboarding_3rd_party_permissions_description')}
      tooltipModalTitle="onboarding_bew_permissions_step_title"
      containerStyle={styles.htmlContainerStyle}
      baseTextStyle={styles.headerHtmlBaseText}
      containerTestID={testID(
        'OnboardingThirdPartyPermissionsStepHeaderSection_view'
      )}
      testID={testID('OnboardingThirdPartyPermissionsStepHeaderSection_text')}
    />
  )

  const PermissionItem = ({
    title,
    description,
    permissionKey,
    titleTestID,
    descriptionTestID,
    toggleTestID
  }: ThirdPartyPermissionItem) => (
    <View
      style={styles.permissionSectionWrapper}
      testID={testID(
        'OnboardingThirdPartyPermissionsStepPermissionItemWrapper_view'
      )}
    >
      <View
        style={styles.permissionTitleWrapper}
        testID={testID(
          'OnboardingThirdPartyPermissionsStepPermissionItemTitleWrapper_view'
        )}
      >
        <VFText
          type="primary"
          style={styles.permissionTitle}
          i18nKey={title}
          testID={testID(titleTestID)}
        />

        <Toggle
          testID={testID(toggleTestID)}
          initialValue={permissionsStatus[permissionKey]}
          onChange={(value) => onToggleChange(value, permissionKey)}
        />
      </View>

      <HtmlRenderer
        source={translate(description)}
        tooltipModalTitle="onboarding_bew_permissions_step_title"
        containerStyle={styles.htmlContainerStyle}
        testID={testID(descriptionTestID)}
      />
    </View>
  )

  const PermissionsSection = () => (
    <View
      style={styles.collapsedContentWrapper}
      testID={testID(
        'OnboardingThirdPartyPermissionsStepPermissionsSection_view'
      )}
    >
      <VFText
        type="primary"
        style={styles.collapsedContentTitle}
        i18nKey="onboarding_3rd_party_permissions_title"
        testID={testID(
          'OnboardingThirdPartyPermissionsStepPermissionsSectionTitle_txt'
        )}
      />

      <VFText
        type="primary"
        style={styles.collapsedContentSubTitle}
        i18nKey="onboarding_3rd_party_permissions_subtitle"
        testID={testID(
          'OnboardingThirdPartyPermissionsStepPermissionsSectionSubtitle_txt'
        )}
      />

      {permissionItems.map((item: ThirdPartyPermissionItem) => (
        <PermissionItem {...item} />
      ))}
    </View>
  )

  const ExpandCollapseButton = () => (
    <TouchableWithoutFeedback
      onPress={onAccordionToggle}
      testID={testID('OnboardingThirdPartyPermissionsStepExpandCollapse_btn')}
    >
      <VFText
        style={styles.expandCollapseButtonText(theme, isCollapsed)}
        i18nKey={
          isCollapsed
            ? 'onboarding_3rd_party_permissions_expand_settings'
            : 'onboarding_3rd_party_permissions_collapse_settings'
        }
        testID={testID('OnboardingThirdPartyPermissionsStepExpandCollapse_txt')}
      />
    </TouchableWithoutFeedback>
  )

  return (
    <View
      style={styles.componentWrapper}
      testID={testID('OnboardingThirdPartyPermissionsStepContainer_view')}
    >
      <Accordion
        renderContent={() => <PermissionsSection />}
        renderHeader={() => <ThirdPartyPermissionsHeader />}
        activeSections={activeSections}
        sections={[{}]}
        touchableProps={{ disabled: true }}
        onSectionContainerLayout={() => {}} // passed with empty function as its called inside without checking if its optional or not
      />

      <ExpandCollapseButton />

      <VFButton
        title={
          isCollapsed
            ? 'onboarding_3rd_party_permissions_accept_continue'
            : 'onboarding_3rd_party_permissions_confirm_continue'
        }
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
        onPress={onContinuePress}
        testID={testID('OnboardingThirdPartyPermissionsStepContinue_txt')}
      />
    </View>
  )
}

export default ThirdPartyPermissionsStep
