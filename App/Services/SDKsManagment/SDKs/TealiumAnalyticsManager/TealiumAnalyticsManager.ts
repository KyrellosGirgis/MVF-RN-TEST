import TealiumHelper, {
  EnvironmentEnum
} from '@vfgroup-oneplatform/foundation/TealiumHelper'
import Config from 'react-native-config'

import { TEALIUM_PROFILE_NAME } from 'App/Services/Keys/Keys.helper'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const startTealium = async () => {
  const environment =
    (await EncryptedStorage.getItem(STORAGE_KEYS.TEALIUM_ENV)) ||
    EnvironmentEnum.TEST
  TealiumHelper.configure(
    'vodafone',
    TEALIUM_PROFILE_NAME,
    Config.IS_PRODUCTION === 'true' ? EnvironmentEnum.PRODUCTION : environment
  )
}

//TODO(will be implemented after finished stop tealium functionality from core team)
const stopTealium = () => {}

export { startTealium, stopTealium }
