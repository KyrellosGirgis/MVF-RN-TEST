import { StyleSheet, Dimensions } from 'react-native'

import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

const { width } = Dimensions.get('window')

export default StyleSheet.create<any>({
  title: (theme) => ({
    fontSize: 18.7,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 0,
    color: theme.colors.headerColor,
    marginHorizontal: 15
  }),
  containerStyle: (theme) => ({
    width: width - 31,
    borderRadius: 6,
    backgroundColor: theme.colors.cardBackgroundColor,
    shadowColor: Colors.linegrey,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 2,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 16
  }),
  childContainerStyle: (theme) => ({
    borderTopWidth: 1,
    paddingTop: 10,
    paddingLeft: 55,
    borderColor: theme.colors.horizontalLineColor
  }),
  headerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5
  }
})
