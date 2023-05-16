import { StyleSheet } from 'react-native'

import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

export default StyleSheet.create<any>({
  main: (opacity: number) => ({
    backgroundColor: Colors.black,
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity,
    justifyContent: 'center',
    alignItems: 'center'
  }),
  btnTitle: {
    color: Colors.white,
    fontSize: 26,
    borderWidth: 1,
    borderColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 6
  },
  lottieContainer: {
    alignSelf: 'center'
  },
  overlayLottie: {
    height: 156,
    width: 156
  }
})
