import { StyleSheet } from 'react-native'
import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  usageInfoCard: {
    elevation: 0,
    shadowColor: Colors.transparent,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0
  },
  paginationStyle: {
    zIndex: 3,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginVertical: 25,
    right: 15
  },
  cardStyle: {
    justifyContent: 'center',
    height: '100%'
  },
  cardCarouselStyle: {
    borderRadius: 6
  }
})
