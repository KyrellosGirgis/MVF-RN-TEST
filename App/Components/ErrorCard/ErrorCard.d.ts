export interface LoadingErrorProps {
  errorText: string
  errorHandler(): void
  theme: theme
  errorDetails: string
}
export interface theme {
  name: string
  isDark: boolean
  colors: {
    tryAgainColor: string
    sectionItemTextColor: string
    backgroundColor: string
    backgroundColorFour: string
  }
}
