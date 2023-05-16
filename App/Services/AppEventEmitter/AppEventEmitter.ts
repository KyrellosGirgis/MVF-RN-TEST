import { DeviceEventEmitter } from 'react-native'

const listenForEvent = (eventName: string, listener: (event: any) => void) => {
  DeviceEventEmitter.addListener(eventName, listener)
}

const emitEvent = (eventName: string, params: any) => {
  DeviceEventEmitter.emit(eventName, params)
}

export { listenForEvent, emitEvent }
