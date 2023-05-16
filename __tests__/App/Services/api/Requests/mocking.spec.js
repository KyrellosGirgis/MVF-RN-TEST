import { mockRequestIfNeeded } from 'App/Services/API/Interceptors/Helpers/mocking'

jest.mock('App/Services/StorageWrappers/EncryptedStorage.ts', () => ({
  getItemParsedToJSON: jest.fn(() => ({
    apis: {
      'DXL.billHistory': {
        baseURL: 'https://0ab3e6b7-58f0-4773-a1a1-d52ae10842b3.mock.pstmn.io',
        headers: {
          'x-mock-response-name': 'success-200-mint-start-dsl'
        }
      }
    }
  }))
}))

describe('Test stubbing API request helper functions', () => {
  const ConfigWithoutAppId = {
    headers: { test: 'test header' },
    url: 'url',
    baseURL: 'https://api.vodafone.de'
  }
  const ConfigWithAppId = {
    headers: { test: 'test header' },
    url: 'url',
    baseURL: 'https://api.vodafone.de',
    apiId: 'DXL.billHistory'
  }
  it('Should mockRequestIfNeeded return config when config han no ApiId', async () => {
    const output = await mockRequestIfNeeded(ConfigWithoutAppId)
    expect(output).toEqual(ConfigWithoutAppId)
  })

  it('Test request is mocked when config has matched apiId', async () => {
    const output = await mockRequestIfNeeded(ConfigWithAppId)
    const expectedOutput = {
      headers: {
        'x-mock-response-name': 'success-200-mint-start-dsl'
      },
      url: 'url',
      baseURL: 'https://0ab3e6b7-58f0-4773-a1a1-d52ae10842b3.mock.pstmn.io',
      apiId: 'DXL.billHistory'
    }
    expect(output).toEqual(expectedOutput)
  })
})
