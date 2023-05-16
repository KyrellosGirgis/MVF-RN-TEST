import { ProcessName } from 'App/Services/API/Requests/Common/Mint/mint.constants'
import ApiRoutes from 'App/Services/API/ApiRoutes'

const DXLBlackList: string[] = []
const legacyBlackList: string[] = [
  ApiRoutes?.Mint.sessionStart.URL,
  ApiRoutes?.Mint.oidcToken.URL,
  ApiRoutes?.Mint.oidcRevoke.URL,
  ApiRoutes?.Mint.sessionEnd.URL,
  ApiRoutes?.Cprx.captcha.URL,
  ApiRoutes?.Mint.processStart.URL(ProcessName.ChangePassword),
  ApiRoutes?.Mint.processStart.URL(ProcessName.ValidateMsisdnViaSms),
  ApiRoutes?.Mint.processStep.URL
]

export { DXLBlackList, legacyBlackList }
