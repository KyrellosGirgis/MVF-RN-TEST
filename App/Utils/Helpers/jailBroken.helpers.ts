import { Alert } from 'react-native'

import Config from 'react-native-config'

import JailMonkey from 'jail-monkey'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { translate } from 'App/Utils'
import { isIOS } from 'App/Utils/Helpers/generic.helpers'

const getJailBrokenOrRootedAlertInfo = () => {
  const title = translate(isIOS ? 'Jailbroken_title' : 'rooted_title')
  const description = translate(
    isIOS ? 'jailbroken_description' : 'rooted_description'
  )

  return { title, description }
}

const checkIfJailBrokenOrRooted = async () => {
  const enableRootedOrJailBrokenAlert =
    Config?.ENABLE_ROOTED_OR_JAILBROKEN_ALERT === 'true'

  const alertIsShown = await EncryptedStorage.getBoolean(
    STORAGE_KEYS.isJailBrokenOrRootedAlertShown
  )

  if (
    enableRootedOrJailBrokenAlert &&
    !alertIsShown &&
    JailMonkey.isJailBroken()
  ) {
    const { title, description } = getJailBrokenOrRootedAlertInfo()

    return new Promise<void>((resolve) => {
      Alert.alert(title, description, [
        {
          text: 'OK',
          onPress: () => {
            EncryptedStorage.setItem(
              STORAGE_KEYS.isJailBrokenOrRootedAlertShown,
              'true'
            )
            resolve()
          }
        }
      ])
    })
  }
}

export { checkIfJailBrokenOrRooted }
