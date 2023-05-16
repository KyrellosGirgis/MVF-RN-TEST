import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export default StyleSheet.create({
  overviewImageStyle: {
    height: 0.25 * height,
    width: '100%',
    resizeMode: 'cover'
  },
  errorTrayModalContainerStyle: { paddingHorizontal: 16 }
})
