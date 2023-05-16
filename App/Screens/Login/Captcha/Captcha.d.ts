export interface CaptchaProps {
  captchaUrl: string
  theme: theme
  onSuccess: () => void
  onFail: (error: any) => void
}
export interface theme {
  name: string
  isDark: boolean
  colors: {}
}
export interface captchaImageContainerProps {
  captchaImageUrl: string
  theme: theme
  loadCaptchaImageUrl: () => void
  setCaptchaImageLoadingFailed: Function
  isCaptchaImageLoading: boolean
}

export interface captchaBodyProps {
  theme: theme
  captchaUrl: string
  submitCaptchaCode: (enteredCaptcha: string) => void
  resetParentStatus: () => void
  onFail: (error: any) => void
}
