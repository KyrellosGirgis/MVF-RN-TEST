import { NativeModules } from 'react-native'

import { isIOS } from 'App/Utils/Helpers/generic.helpers'

const NetworkLoggerInspector = isIOS
  ? NativeModules.NetworkLoggerModule
  : NativeModules.AndroidNetworkLogger
const readNetworkLogs = async () => {
  var networkLogs = await NetworkLoggerInspector.readNetworkLogs()
  return networkLogs
}

const clearNetworkLogs = async () => {
  await NetworkLoggerInspector.clearNetworkLogs()
}

const startNetworkLogging = async () => {
  await NetworkLoggerInspector.startLogging()
}

const stopNetworkLogging = async () => {
  await NetworkLoggerInspector.stopLogging()
}

export {
  readNetworkLogs,
  clearNetworkLogs,
  startNetworkLogging,
  stopNetworkLogging,
  NetworkLoggerInspector
}
