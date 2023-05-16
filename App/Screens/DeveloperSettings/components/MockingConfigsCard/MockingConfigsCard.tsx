import React, { useEffect, useRef } from 'react'

import { VFInput, VFText } from '@vfgroup-oneplatform/foundation/Components'

import {
  getThemeImages,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import { useSelector } from 'react-redux'

import Config from 'react-native-config'

import styles, { inputThemeStyle } from './MockingConfigsCard.styles'

import { loadMockingConfigs } from './MockingConfigsCard.helpers'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'

import { store } from 'App/Redux'
import { developerSettingsActions } from 'App/Redux/reducers/DeveloperSettings.reducer'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const MockingConfigsCard = () => {
  const theme = useTheme()
  const Images = getThemeImages(theme.name)
  const { testCaseName, mockFileName } = useSelector(
    (state: any) => state.developerSettings.mockingConfigs
  )
  const testCaseNameRef = useRef()
  const mockFileNameRef = useRef()

  useEffect(() => {
    loadMockingConfigs()
  }, [])

  return (
    <DeveloperSettingsCard
      title="Mocking Configs"
      icon={Images.community_or_foundation}
      childContainerStyle={styles.mockingContainerCard}
    >
      <VFText style={styles.textStyle(theme)}>Test Case Name</VFText>
      <VFInput
        {...inputThemeStyle(theme)}
        autoCapitalize="none"
        testID={testID('DeveloperSettingTestCaseName_input')}
        onChangeText={(text) => {
          store.dispatch(developerSettingsActions.setTestCaseName(text))
        }}
        ref={(_ref) => {
          testCaseNameRef && (testCaseNameRef.current = _ref)
          testCaseNameRef?.current?.state &&
            (testCaseNameRef.current.state.text = testCaseName)
        }}
      />

      <VFText style={styles.textStyle(theme)}>Mock File Name</VFText>
      <VFInput
        {...inputThemeStyle(theme)}
        autoCapitalize="none"
        testID={testID('DeveloperSettingTestCaseURL_input')}
        onChangeText={(text) => {
          store.dispatch(developerSettingsActions.setMockFileName(text))
        }}
        ref={(_ref) => {
          mockFileNameRef && (mockFileNameRef.current = _ref)
          mockFileNameRef?.current?.state &&
            (mockFileNameRef.current.state.text = mockFileName)
        }}
      />

      <VFText style={styles.textStyle(theme)}>
        base url: {Config.MOCK_BASE_URL}
        values: {testCaseName} {mockFileName}
      </VFText>
    </DeveloperSettingsCard>
  )
}

export default MockingConfigsCard
