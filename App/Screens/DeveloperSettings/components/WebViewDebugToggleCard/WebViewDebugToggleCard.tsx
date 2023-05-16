import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import { Toggle } from '@vfgroup-oneplatform/foundation/Components'

import { styles } from './WebViewDebugToggleCard.styles'

import DeveloperSettingsCardSection from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const WebViewDebugToggleCard = forwardRef((_, ref) => {
  const [webViewDebugToggleState, setWebViewDebugToggleState] = useState(false)

  const initWebViewDebugToogle = async () => {
    const WebViewDebugToggleInitialValue = await EncryptedStorage.getBoolean(
      STORAGE_KEYS.shouldDebugWebView
    )
    setWebViewDebugToggleState(!!WebViewDebugToggleInitialValue)
  }

  useEffect(() => {
    initWebViewDebugToogle()
  }, [])

  const save = async () => {
    await EncryptedStorage.setBoolean(
      STORAGE_KEYS.shouldDebugWebView,
      webViewDebugToggleState
    )
  }

  useImperativeHandle(ref, () => ({ save }))

  const onToggleShouldDebugWebView = (shouldDebug: boolean) => {
    setWebViewDebugToggleState(!shouldDebug)
  }

  const renderWebViewDebugToggle = () => (
    <Toggle
      initialValue={webViewDebugToggleState}
      selected={webViewDebugToggleState}
      onChange={onToggleShouldDebugWebView}
      size="small"
      testID={testID('WebViewDebugToggle')}
    />
  )

  return (
    <DeveloperSettingsCard title="Debug WebView">
      <DeveloperSettingsCardSection
        title={'Enable debug webview'}
        description=""
        renderRightElement={renderWebViewDebugToggle}
        containerStyle={styles.cardSectionStyleWithNoBorder}
      />
    </DeveloperSettingsCard>
  )
})

export default WebViewDebugToggleCard
