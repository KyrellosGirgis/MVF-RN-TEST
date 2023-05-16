import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { SettingsRadio } from '@vfgroup-oneplatform/framework/Settings/components'

import { EnvironmentEnum } from '@vfgroup-oneplatform/foundation/TealiumHelper'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const TealiumEnvSwitcher = forwardRef((_, ref) => {
  const [selectedEnv, setSelectedEnv] = useState('')

  const initTealiumEnvSwitcher = async () => {
    const initialENV =
      (await EncryptedStorage.getItem(STORAGE_KEYS.TEALIUM_ENV)) ||
      EnvironmentEnum.TEST
    setSelectedEnv(initialENV)
  }

  useEffect(() => {
    initTealiumEnvSwitcher()
  }, [])

  const save = async () => {
    await EncryptedStorage.setItem(STORAGE_KEYS.TEALIUM_ENV, selectedEnv)
  }

  useImperativeHandle(ref, () => ({ save }))

  return (
    <DeveloperSettingsCard title="Tealium Env Switcher">
      <SettingsRadio
        isSelected={selectedEnv === EnvironmentEnum.TEST}
        onPress={() => {
          setSelectedEnv(EnvironmentEnum.TEST)
        }}
        title={EnvironmentEnum.TEST}
        testID="TestRadio"
      />
      <SettingsRadio
        isSelected={selectedEnv === EnvironmentEnum.DEVELOP}
        onPress={() => {
          setSelectedEnv(EnvironmentEnum.DEVELOP)
        }}
        title={EnvironmentEnum.DEVELOP}
        testID="DevelopRadio"
      />
    </DeveloperSettingsCard>
  )
})
export default TealiumEnvSwitcher
