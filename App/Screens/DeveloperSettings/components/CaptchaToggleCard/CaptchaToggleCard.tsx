import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import { Toggle } from '@vfgroup-oneplatform/foundation/Components'

import { styles } from './CaptchaToogleCard.styles'

import DeveloperSettingsCardSection from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const CaptchaToggleCard = forwardRef((_, ref) => {
  const [captchaToggleState, setCaptchaToggleState] = useState(false)

  const initCaptchaToogle = async () => {
    const capthaToggleInitialValue = await EncryptedStorage.getBoolean(
      STORAGE_KEYS.shouldSkipCaptcha
    )
    setCaptchaToggleState(!!capthaToggleInitialValue)
  }

  useEffect(() => {
    initCaptchaToogle()
  }, [])

  const save = async () => {
    await EncryptedStorage.setBoolean(
      STORAGE_KEYS.shouldSkipCaptcha,
      captchaToggleState
    )
  }

  useImperativeHandle(ref, () => ({ save }))

  const onToggleShouldSkipCaptcha = (shouldSkip: boolean) => {
    setCaptchaToggleState(!shouldSkip)
  }

  const renderCaptchaToggle = () => (
    <Toggle
      initialValue={captchaToggleState}
      inactiveContainerStyle={styles.inactiveContainerStyle}
      selected={captchaToggleState}
      onChange={onToggleShouldSkipCaptcha}
      size="small"
      testID={testID('CaptchaToggle')}
    />
  )

  return (
    <DeveloperSettingsCard title="Captcha">
      <DeveloperSettingsCardSection
        title={'Skip Captcha'}
        description=""
        renderRightElement={renderCaptchaToggle}
        containerStyle={styles.cardSectionStyleWithNoBorder}
      />
    </DeveloperSettingsCard>
  )
})

export { CaptchaToggleCard }
