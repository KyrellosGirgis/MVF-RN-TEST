import { Platform } from 'react-native'

import { getBundleId } from 'react-native-device-info'

const testID = (testID?: string) => {
  const appIdentifier = getBundleId()

  if (!testID) {
    return undefined
  }

  const prefix = `${appIdentifier}:id/`
  const hasPrefix = testID.startsWith(prefix)

  return Platform.select({
    android: !hasPrefix ? `${prefix}${testID}` : testID,
    ios: hasPrefix ? testID.slice(prefix.length) : testID
  })
}

export { testID }
