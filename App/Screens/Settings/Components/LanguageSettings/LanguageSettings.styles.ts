import { StyleSheet } from 'react-native'

export default StyleSheet.create<any>({
  separator: (theme: any) => ({
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.horizontalLineColor,
    marginVertical: 16
  })
})
