import { StyleSheet } from 'react-native'

export default StyleSheet.create<any>({
  containerStyle: (theme) => ({
    borderBottomWidth: 1,
    borderColor: theme.colors.borderColorThree,
    paddingVertical: 10
  }),
  titleContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleTextStyle: (theme) => ({
    fontSize: 16.6,
    lineHeight: 22,
    letterSpacing: 0,
    color: theme.colors.headerColor
  }),
  buttonStyle: (theme) => ({
    height: undefined,
    backgroundColor: theme.colors.transparentColor
  }),
  disabledButtonStyle: (theme) => ({
    backgroundColor: theme.colors.transparentColor
  }),
  disabledButtonTextStyle: {
    opacity: 0.3
  },
  descriptionTextStyle: (theme) => ({
    fontSize: 16.6,
    lineHeight: 22,
    letterSpacing: 0,
    color: theme.colors.textColorTwo
  })
})
