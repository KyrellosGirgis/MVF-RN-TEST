import { Dimensions } from 'react-native'
import { setLoadingConfigObject } from '@vfgroup-oneplatform/foundation/Components/Shimmer/Shimmer.utils'

const { width } = Dimensions.get('window')
const loadingConfig = [
  {
    main: setLoadingConfigObject('line', 1, width * 0.8, {
      marginTop: 48,
      height: 18
    }),
    style: {}
  },

  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 20,
      height: 14
    }),
    style: {}
  },
  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 8,
      height: 14
    }),
    style: {}
  },

  {
    main: setLoadingConfigObject('line', 1, width * 0.5, {
      marginTop: 30,
      height: 14
    }),
    style: {}
  },

  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 18,
      height: 59
    }),
    style: {}
  },
  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 1,
      height: 59
    }),
    style: {}
  },
  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 1,
      height: 59
    }),
    style: {}
  },

  {
    main: setLoadingConfigObject('line', 1, width * 0.5, {
      marginTop: 50,
      height: 14
    }),
    style: {}
  },

  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 18,
      height: 59
    }),
    style: {}
  },
  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 1,
      height: 59
    }),
    style: {}
  },
  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 1,
      height: 59
    }),
    style: {}
  },

  {
    main: setLoadingConfigObject('line', 1, width, {
      marginTop: 34,
      height: 47
    }),
    style: {}
  }
]

export default loadingConfig
