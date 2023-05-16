export interface CTAHandlerProps {
  title: string
  handler: Function
}

export interface ErrorTrayBodyProps {
  errorMessage: string
  CTAhandler: CTAHandlerProps
}

export interface ErrorTypeObject {
  Type: String
  CTAHandler?: CTAHandlerProps
  body: string
}
