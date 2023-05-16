export interface OnboardingStep {
  onNextStep: () => void
  onSkipStep: () => void
  isActive: boolean
  initToBi: Function
  setToBiSize: Function
  withToBi: boolean
  setToBiX: Function
  setToBiY: Function
  theme: { name: string }
}
