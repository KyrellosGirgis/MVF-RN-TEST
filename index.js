import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'

import CodePush from 'react-native-code-push'

import Config from 'react-native-config'

import NetInfo from '@react-native-community/netinfo'

import App from './App'
import { name as appName } from './app.json'

import 'App/I18n'

NetInfo.configure({
  reachabilityShouldRun: () => false
})

const CodePushAppWrapper =
  Config.ENABLE_CODE_PUSH === 'true' ? CodePush(App) : App

AppRegistry.registerComponent(appName, () => CodePushAppWrapper)
