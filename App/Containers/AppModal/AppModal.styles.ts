import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { StyleSheet } from 'react-native'

import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Provider/index.d'

import { Fonts } from 'App/Themes'

export default StyleSheet.create<any>({
  modalStyle: {
    margin: 0, // default modal has margins
    shadowColor: Colors.dark_grey,
    shadowOffset: { height: -2 },
    shadowOpacity: 0.16,
    shadowRadius: 8
  },
  rnWindowView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  contentContainer: {
    backgroundColor: Colors.icGreyStep,
    height: '100%',
    justifyContent: 'flex-end'
  },
  containerStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: '100%'
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 36
  },
  titleStyle: (theme: Theme) => ({
    color: theme.colors.headerTitleColor,
    fontFamily: Fonts.type.bold.fontFamily,
    fontWeight: 'bold',
    fontSize: Fonts.size.regularSmall,
    letterSpacing: -0.27,
    textAlignVertical: 'center',
    lineHeight: 22
  }),
  closeButton: {
    width: 24,
    height: 24
  }
})
