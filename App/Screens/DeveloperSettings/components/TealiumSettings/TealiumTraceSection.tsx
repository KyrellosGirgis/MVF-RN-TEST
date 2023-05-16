import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import {
  VFButton,
  VFInput,
  VFText
} from '@vfgroup-oneplatform/foundation/Components'

import { View } from 'react-native'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes/Provider'

import tealiumSectionStyles from './TealiumTraceSection.styles'

import DevSettingsStyles from 'App/Screens/DeveloperSettings/DeveloperSettings.styles'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'

import { testID } from 'App/Utils/Helpers/testId.helpers'

import styles, {
  inputThemeStyle
} from 'App/Screens/DeveloperSettings/components/MockingConfigsCard/MockingConfigsCard.styles'

import {
  addToTrackingCommonData,
  removeFromTrackingCommonData
} from 'App/Services/SDKsManagment/SDKs/TealiumAnalyticsManager/AnalyticsManager'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

const TealiumTraceID = forwardRef((_, ref) => {
  const [traceID, setTraceID] = useState('')

  const initTraceId = async () => {
    const id = await EncryptedStorage.getItem('traceID')
    setTraceID(id)
  }

  useEffect(() => {
    initTraceId()
  }, [])

  const save = async () => {
    await EncryptedStorage.setItem('traceID', traceID)
  }

  const theme = useTheme()

  useImperativeHandle(ref, () => ({ save }))

  return (
    <DeveloperSettingsCard
      title="Tealium Tracer"
      childContainerStyle={styles.mockingContainerCard}
    >
      <VFText style={styles.textStyle(theme)}>Tealium Trace ID:</VFText>

      <VFInput
        defaultValue={traceID}
        {...inputThemeStyle(theme)}
        autoCapitalize="none"
        testID={testID('TealiumTraceIDInput')}
        onChangeText={(text) => {
          setTraceID(text)
        }}
      />
      <View style={tealiumSectionStyles.bottomBtnsContainer}>
        <VFButton
          testKey={testID('StartTraceBtn')}
          title="Start Trace"
          onPress={() => {
            addToTrackingCommonData('cp.trace_id', traceID)
          }}
          style={DevSettingsStyles.button}
        />
        <VFButton
          testKey={testID('EndTraceBtn')}
          title="Stop Trace"
          onPress={() => {
            removeFromTrackingCommonData('cp.trace_id')
          }}
          style={DevSettingsStyles.button}
        />
      </View>
    </DeveloperSettingsCard>
  )
})
export default TealiumTraceID
