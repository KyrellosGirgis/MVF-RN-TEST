import { StyleSheet, Dimensions } from 'react-native'

import { isSmallDevice } from '@vfgroup-oneplatform/foundation/Utils/Platform'
import {
  Colors,
  Metrics
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Fonts } from 'App/Themes'

const screenWidth = Dimensions.get('window').width
const isSmallDevices = isSmallDevice()

export default StyleSheet.create<any>({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    paddingTop: 20,
    paddingBottom: 100
  },
  containerStyle: {
    flex: 1
  },
  logo: {
    height: Metrics.images.logo,
    marginTop: Metrics.doubleSection,
    resizeMode: 'contain',
    width: Metrics.images.logo
  },
  trayAnimatedView: {
    backgroundColor: Colors.transparent,
    height: 78,
    justifyContent: 'flex-end',
    width: screenWidth
  },
  subTrayCardsContainerStyle: {
    marginTop: isSmallDevices ? 8 : 10
  },
  subTraySwitchingButton: {
    width: 158,
    height: 31
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
  },
  textStyle: {
    fontSize: 16.6,
    ...Fonts.type.bold
  },
  errorDetailsTextStyle: {
    textAlign: 'center',
    lineHeight: 20
  },
  overlayLottie: {
    height: 156,
    width: 156
  }
})
