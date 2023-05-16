import React from 'react'

import { View } from 'react-native'
import { Toggle } from '@vfgroup-oneplatform/foundation/Components'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from 'App/Themes'

import styles from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/NetperformSection//NetperformSection.styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'
import { HtmlRenderer } from 'App/Components'
import { translate } from 'App/Utils'
import Separator from 'App/Components/Separator/Separator'
import TextWithIconView from 'App/Components/TextWithIconView/TextWithIconView'
import { DATA_PRIVACY_PERMISSIONS } from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.constants'

type NetperformSectionProps = {
  onToggleChange: Function
}

const NetperformSection = ({ onToggleChange }: NetperformSectionProps) => {
  const theme = useTheme()
  const images = getThemeImages(theme.name)

  return (
    <View>
      <Separator
        style={styles.netperformSeparator}
        testID={testID('OnboardingBEWStepNetperformSectionSeparator_view')}
      />

      <View
        style={styles.netperformHeaderWrapper}
        testID={testID('OnboardingBEWStepNetperformSectionHeaderWrapper_view')}
      >
        <TextWithIconView
          title="onboarding_bew_netperform_toggle_title"
          icon={images.networkSignal}
          iconStyle={styles.netperformHeaderIcon}
          testId="OnboardingBEWStepNetperformSectionHeaderWithIcon"
        />
        <Toggle
          testID={testID(
            'OnboardingBEWStepNetperformSectionHeaderSwitch_toggle'
          )}
          initialValue={false}
          onChange={(value) =>
            onToggleChange(value, DATA_PRIVACY_PERMISSIONS.NETPERFORM)
          }
        />
      </View>

      <HtmlRenderer
        source={translate('onboarding_bew_netperform_toggle_description')}
        tooltipModalTitle="onboarding_bew_permissions_step_title"
        containerTestID={testID(
          'OnboardingBEWStepNetperformSectionHtmlText_view'
        )}
        testID={testID('OnboardingBEWStepNetperformSectionHtml_text')}
      />
    </View>
  )
}

export default NetperformSection
