export interface SplashProps {
  startSplashEndingAnimation: () => void
  dismissSplash: () => void
  endingDuration: number
  setSplashMode: () => void
  setSplashColor: (color: string) => void
  setSplashLogoPosition: () => void
}
