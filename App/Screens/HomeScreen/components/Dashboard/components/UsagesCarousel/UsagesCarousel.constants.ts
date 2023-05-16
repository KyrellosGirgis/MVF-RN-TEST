import { WindowDimenions } from 'App/Utils/RNNativeModules/generic.RNNativeModules'

const SCREEN_WIDTH = WindowDimenions.width

const swipeOpacityInterpolateInputRange = [
  -SCREEN_WIDTH,
  (-2 * SCREEN_WIDTH) / 3,
  -20,
  0,
  SCREEN_WIDTH / 3,
  SCREEN_WIDTH - 20,
  SCREEN_WIDTH
]

const swipeOpacityInterpolateOutputRange = [1, 0, 0, 1, 0, 0, 1]

export { swipeOpacityInterpolateInputRange, swipeOpacityInterpolateOutputRange }
