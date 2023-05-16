import { StyleSheet } from 'react-native'

import { Fonts } from 'App/Themes'
import { theme } from './Captcha.d'

export default StyleSheet.create<any>({
  container: (keyboardHeight: number) => ({
    paddingBottom: keyboardHeight,
    paddingHorizontal: 16
  }),

  loadingContainer: {
    height: 410
  },

  title: {
    fontFamily: Fonts.type.VodafoneLt,
    fontSize: Fonts.size.xh4,
    paddingTop: 18,
    lineHeight: 30
  },

  captchaBodyText: {
    fontFamily: Fonts.type.VFFont,
    fontSize: Fonts.size.regularSmall,
    paddingTop: 16,
    lineHeight: 22
  },

  errorMessage: {
    height: 90,
    marginLeft: 1,
    marginRight: 0,
    marginBottom: -16
  },

  captchaErrorText: {
    fontSize: Fonts.size.regularSmall,
    fontFamily: Fonts.type.VFFont,
    lineHeight: 22
  },

  captchaImageContainer: {
    flexDirection: 'row',
    paddingTop: 32
  },

  image: {
    width: 138,
    height: 50,
    borderRadius: 6,
    marginRight: 19
  },

  retry: {
    flexDirection: 'row'
  },

  retryImage: (theme: theme) => ({
    width: 24,
    height: 24,
    marginTop: 15,
    marginRight: 10.5,
    tintColor: theme.colors.tryAgainColor
  }),

  retryText: (theme: theme) => ({
    color: theme.colors.tryAgainColor,
    fontFamily: Fonts.type.VFFont,
    fontSize: Fonts.size.input,
    paddingTop: 18,
    lineHeight: 19
  }),

  input: {
    marginTop: 24,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 39,
    height: 48
  },

  Buttons: {
    marginTop: 16,
    marginLeft: 0,
    marginRight: 0
  },

  disabledButtonStyle: (theme: theme) => ({
    backgroundColor: theme.colors.buttons.disabled
  }),
  disabledTextStyle: (theme: theme) => ({
    color: theme.colors.textButtons.disabled
  }),
  shimmerContainer: {
    width: 138,
    height: 50,
    marginRight: 19
  }
})
