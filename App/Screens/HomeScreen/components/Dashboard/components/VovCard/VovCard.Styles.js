import { StyleSheet } from 'react-native'

import {
  Fonts,
  Colors
} from '@vfgroup-oneplatform/foundation/Components/Themes'

export default StyleSheet.create({
  container: {
    borderRadius: 6,
    height: 200,
    marginBottom: 32,
    elevation: 0,
    shadowColor: Colors.transparent,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0
  },
  imageStyle: {
    width: 150,
    height: 150,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    resizeMode: 'cover',
    margin: 32
  },
  textContainer: {
    padding: 16,
    justifyContent: 'space-between',
    flex: 1
  },
  title: {
    fontFamily: Fonts.type.VodafoneLt,
    color: Colors.white,
    fontSize: 29,
    lineHeight: 37,
    marginBottom: 9
  },
  subTitle: {
    color: Colors.white,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0
  },
  textIconContainer: {
    flexDirection: 'row'
  },
  text: {
    fontFamily: Fonts.type.VFFont,
    color: Colors.snow,
    fontSize: 19,
    lineHeight: 22.9,
    marginTop: 1
  },
  btn: {
    flexDirection: 'row'
  }
})
