import { getVersion, getModel } from 'react-native-device-info'

const getAppVersion = () => {
  return getVersion()
}

const getDeviceModel = () => {
  return getModel()
}

export { getAppVersion, getDeviceModel }
