
import { Platform, Dimensions } from 'react-native'

export const { width, height } = Dimensions.get('window')
export const isIOS = Platform.OS === 'ios'

export const isIphoneX = (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  ((height === 812 || width === 812) || (height === 896 || width === 896))
)

