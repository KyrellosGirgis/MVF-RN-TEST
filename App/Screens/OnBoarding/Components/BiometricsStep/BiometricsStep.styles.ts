import { StyleSheet } from 'react-native'

import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Fonts } from 'App/Themes'

export default StyleSheet.create({
  container: {
    paddingBottom: 10
  },
  buttonStyle: {
    width: 187,
    height: 44,
    marginVertical: 10
  },
  skipButtonStyle: {
    borderWidth: 1,
    width: 187,
    height: 44,
    marginVertical: 10
  },
  skipButtonText: {
    fontSize: 18,
    lineHeight: 24
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.cardBackground
  },
  text: {
    fontFamily: Fonts.type.VodafoneLt,
    fontSize: 25,
    lineHeight: 31.2,
    width: 205,
    marginBottom: 22
  }
})
