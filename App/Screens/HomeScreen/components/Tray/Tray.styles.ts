import { StyleSheet } from 'react-native'

import { isSmallDevice } from '@vfgroup-oneplatform/foundation/Utils/Platform'
import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Fonts } from 'App/Themes'

import { WindowDimenions } from 'App/Utils/RNNativeModules/generic.RNNativeModules'

const isSmallDevices = isSmallDevice()

export default StyleSheet.create<any>({
  trayAnimatedView: {
    backgroundColor: Colors.transparent,
    height: 78,
    justifyContent: 'flex-end',
    width: WindowDimenions.width
  },
  subTrayCardsContainerStyle: {
    marginTop: isSmallDevices ? 8 : 10
  },
  subTrayFooterButton: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 136,
    height: 32,
    marginTop: 20
  },
  subTrayFooterButtonText: {
    fontSize: 17,
    ...Fonts.type.bold
  }
})
