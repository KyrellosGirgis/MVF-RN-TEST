import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  cardSectionStyleWithNoBorder: {
    borderBottomWidth: 0
  },
  textStyle: (theme) => ({
    fontSize: 12.6,
    lineHeight: 22,
    letterSpacing: 0,
    color: theme.colors.headerColor,
    width: '80%'
  })
})
