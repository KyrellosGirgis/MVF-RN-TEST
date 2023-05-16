import { WithTrayProps, SplashProps, ScreenProps } from 'App/types'

export interface HomeProps extends ScreenProps, WithTrayProps {
  splashProps: SplashProps
}
