import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  cardSectionStyleWithNoBorder: {
    borderBottomWidth: 0
  },
  textStyle: (theme) => ({
    fontSize: 16.6,
    lineHeight: 22,
    letterSpacing: 0,
    color: theme.colors.headerColor
  })
})
export { styles }
