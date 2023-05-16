import { ReactNode } from 'react'

export type AppUserDataErrorsBodyProps = {
  body: ReactNode
  primaryButtonTitle?: string
  onPrimaryButtonPress?(): void
  secondaryButtonTitle?: string
  onSecondaryButtonPress?(): void
}
