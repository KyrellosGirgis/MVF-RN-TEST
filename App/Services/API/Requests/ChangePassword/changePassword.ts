import {
  proceedMintProcessStep,
  startMintProcess
} from 'App/Services/API/Requests/Common/Mint/mint'

import { ProcessName } from 'App/Services/API/Requests/Common/Mint/mint.constants'

const changePassword = async (currentPassword: string, newPassword: string) => {
  const processStartResponse = await startMintProcess(
    ProcessName.ChangePassword
  )
  await proceedMintProcessStep(
    processStartResponse.data.actionType,
    processStartResponse.data.stepName,
    {
      oldPassword: currentPassword,
      newPassword1: newPassword,
      newPassword2: newPassword
    },
    processStartResponse.data.processId
  )
}

export { changePassword }
