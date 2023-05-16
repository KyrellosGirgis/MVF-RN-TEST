import ApiRoutes from 'App/Services/API/ApiRoutes'

const APIsAllowedToStoreCookies: string[] = [
  ApiRoutes?.Mint.sessionStart.URL,
  ApiRoutes?.Cprx.captcha.URL,
  ApiRoutes?.Mint.processStep.URL
]

export { APIsAllowedToStoreCookies }
