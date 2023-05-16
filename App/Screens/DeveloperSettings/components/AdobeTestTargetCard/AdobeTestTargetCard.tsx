import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import { SettingsRadio } from '@vfgroup-oneplatform/framework/Settings/components'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const AdobeTestTargetCard = forwardRef((_, ref) => {
  const [adobeTestTarget, setAdobeTestTarget] = useState('live')

  const saveAdobeTestTarget = async () => {
    await EncryptedStorage.setItem(
      STORAGE_KEYS.selectedAdobeTestTarget,
      adobeTestTarget
    )
  }

  const adobeTestTargets = {
    live: async () => {
      await EncryptedStorage.removeItem(STORAGE_KEYS.selectedAdobeTestTarget)
    },
    test: saveAdobeTestTarget,
    test1: saveAdobeTestTarget,
    test2: saveAdobeTestTarget,
    test3: saveAdobeTestTarget,
    test4: saveAdobeTestTarget
  }

  const preselectAdobeTestTarget = async () => {
    const savedAdobeTestTarget = await EncryptedStorage.getItem(
      STORAGE_KEYS.selectedAdobeTestTarget
    )

    if (savedAdobeTestTarget) {
      const adobeTarget = Object.keys(adobeTestTargets).find(
        (key) => key === savedAdobeTestTarget
      )
      adobeTarget && setAdobeTestTarget(adobeTarget)
    }
  }

  useEffect(() => {
    preselectAdobeTestTarget()
  }, [])

  const save = async () => {
    await adobeTestTargets[adobeTestTarget]()
  }

  useImperativeHandle(ref, () => ({ save }))

  return (
    <DeveloperSettingsCard title="Adobe Test Target">
      {Object.keys(adobeTestTargets).map((key) => (
        <SettingsRadio
          isSelected={adobeTestTarget === key}
          onPress={() => {
            setAdobeTestTarget(key)
          }}
          title={key}
          testID={testID(`adobe_${key}_radio`)}
        />
      ))}
    </DeveloperSettingsCard>
  )
})

export default AdobeTestTargetCard
