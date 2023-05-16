import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import { VFInput, VFText } from '@vfgroup-oneplatform/foundation/Components'

import {
  getThemeImages,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles, { inputThemeStyle } from './CMSConfigsCard.styles'

import { saveAndApplyCmsConfigs } from 'App/Screens/DeveloperSettings/components/CMSConfigsCard/CMSConfigsCard.helpers'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { getMockedCMSRootURL } from 'App/Services/API/Requests/CMS/CMS.helper'

const CMSConfigsCard = forwardRef((_, ref) => {
  const cmsUrlInputRef = useRef<any>()
  const theme = useTheme()
  const Images = getThemeImages(theme.name)
  const [, setIsCMSRootUrlMocked] = useState<boolean | undefined>(undefined)

  const prefillCmsUrlTextInput = async () => {
    const mockedCMSRootURL = await getMockedCMSRootURL()
    if (mockedCMSRootURL) {
      cmsUrlInputRef.current.state.text = mockedCMSRootURL
      setIsCMSRootUrlMocked(!!mockedCMSRootURL)
    }
  }

  useEffect(() => {
    prefillCmsUrlTextInput()
  }, [])

  const save = async () => {
    await saveAndApplyCmsConfigs(cmsUrlInputRef.current.state.text)
  }

  useImperativeHandle(ref, () => ({ save }))

  return (
    <DeveloperSettingsCard
      title="CMS Configs"
      icon={Images.community_or_foundation}
      childContainerStyle={styles.cmsContainerCard}
    >
      <VFText
        style={styles.textStyle(theme)}
        i18nKey="CMS URL"
        testID={testID('CMSURL_txt')}
      />
      <VFInput
        ref={(_ref) => {
          cmsUrlInputRef && (cmsUrlInputRef.current = _ref)
        }}
        {...inputThemeStyle(theme)}
        autoCapitalize="none"
        testID={testID('CMSURL')}
        onChangeText={(text: string) => setIsCMSRootUrlMocked(!!text)}
      />
    </DeveloperSettingsCard>
  )
})
export default CMSConfigsCard
