/* eslint-disable import/namespace */

import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'

import VerifyCodeImplementation from 'App/Screens/Login/VerifyCode/VerifyCodeImplementation'
import * as MintAPIs from 'App/Services/API/Requests/Common/Mint/mint'

describe('verify code Implementation', () => {
  const instance = VerifyCodeImplementation
  const res = {
    response: 'done',
    data: {
      actionType: 'actionType',
      stepName: 'stepName',
      parameters: {
        msisdn: ' '
      },
      processId: 'processId'
    }
  }

  it('Ensure that getSMSCode calls startMintProcess and proceedMintProcessStep with the right verfication code', async () => {
    MintAPIs.startMintProcess = jest.fn(() => {
      return res
    })

    MintAPIs.proceedMintProcessStep = jest.fn()
    await instance.getSMSCode(' ')
    expect(MintAPIs.startMintProcess).toHaveBeenCalled()
    expect(MintAPIs.proceedMintProcessStep).toHaveBeenCalledWith(
      'actionType',
      'stepName',
      { msisdn: ' ' },
      'processId'
    )
  })

  it('Ensure that getSMSCode returns expected object on Success', async () => {
    const processStepResponse = ''

    MintAPIs.startMintProcess = jest.fn(() => {
      return res
    })

    MintAPIs.proceedMintProcessStep = jest.fn(() => {
      return processStepResponse
    })
    const respon = await instance.getSMSCode()

    expect(respon).toMatchObject({
      status: Status.Success,
      processStepResponse
    })
  })

  it('Ensure that when startMintProcess fails  proceedMintProcessStep didnot get called ', async () => {
    MintAPIs.startMintProcess = jest.fn(() => {
      return Promise.reject('error')
    })

    MintAPIs.proceedMintProcessStep = jest.fn()

    expect(MintAPIs.proceedMintProcessStep).not.toHaveBeenCalled()
    await expect(instance.getSMSCode('')).rejects.toStrictEqual('error')
  })

  it('Ensure that when proceedMintProcessStep fails return error Info', async () => {
    MintAPIs.startMintProcess = jest.fn(() => {
      return Promise.resolve({
        data: ''
      })
    })

    MintAPIs.proceedMintProcessStep = jest.fn(() => {
      throw 'Error'
    })
    // const response = await instance.getSMSCode('')

    await expect(instance.getSMSCode('')).rejects.toStrictEqual('Error')
  })

  it('should getResendCodeTimeout return 30000', () => {
    expect(instance.getResendCodeTimeout()).toBe(30000)
  })
})
