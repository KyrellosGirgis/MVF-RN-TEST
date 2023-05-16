export interface HandlerProps {
  title: string
  handlerAction: Function
}

export interface ErrorTrayBodyProps {
  errorMessage: string
  primaryButtonHandler: HandlerProps
  secondaryButtonHandler: HandlerProps
}
