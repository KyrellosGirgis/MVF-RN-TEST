import { StyleSheet } from 'react-native'
import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

export default StyleSheet.create({
  container: {
    height: 250,
    overflow: 'hidden',
    backgroundColor: Colors.transparent,
    elevation: 0
  },

  paginationStyle: {
    zIndex: 3,
    position: 'absolute',
    shadowOpacity: 0,
    alignSelf: 'center',
    bottom: 0,
    marginVertical: 16
  },
  cardStyle: {
    justifyContent: 'center',
    height: '100%'
  },
  cardCarouselStyle: {
    borderRadius: 0
  }
})
