import { store } from 'App/Redux'
import { developerSettingsActions } from 'App/Redux/reducers/DeveloperSettings.reducer'

import { ApiMockObject } from 'App/Services/API/Requests/DeveloperSettings/DeveloperSettings'
import { fetchMockingTestCases } from 'App/Services/API/Requests/DeveloperSettings/mocking'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const INVALID_TESTCASES_OBJECT =
  'Invalid Test case Object - please check remote test cases file'

const INVALID_TESTCASE_NAME_ALERT_MESSAGE =
  'Invalid Test case Name - test case not existed'

const loadMockingConfigs = async () => {
  const { testCaseName, mockFileName } =
    await EncryptedStorage.getItemParsedToJSON(STORAGE_KEYS.MOCKS_CONFIGS)
  store.dispatch(developerSettingsActions.setTestCaseName(testCaseName))
  store.dispatch(developerSettingsActions.setMockFileName(mockFileName))
}

const persistMockingConfigs = async () => {
  await EncryptedStorage.setObject(
    STORAGE_KEYS.MOCKS_CONFIGS,
    store.getState().developerSettings.mockingConfigs
  )
}

const loadMockingFile = async ({
  mockFileName
}: {
  mockFileName: string
}): ApiMockObject => {
  const allMocks: ApiMockObject = await fetchMockingTestCases(mockFileName)
  return (
    allMocks ||
    (() => {
      throw Error(INVALID_TESTCASES_OBJECT)
    })()
  )
}

const persistMockObject = async (mockObject: any) => {
  await EncryptedStorage.setObject(STORAGE_KEYS.MOCK_OBJECT, mockObject)
}

const saveAndApplyMockingConfigs = async () => {
  persistMockingConfigs()

  const { testCaseName, mockFileName } =
    store.getState().developerSettings.mockingConfigs

  if (testCaseName && mockFileName) {
    const allMocks = await loadMockingFile({ mockFileName })
    const mockObject = allMocks[testCaseName]
    if (mockObject) {
      persistMockObject(mockObject)
    } else {
      throw Error(INVALID_TESTCASE_NAME_ALERT_MESSAGE)
    }
  } else {
    persistMockObject({})
  }
}

export { loadMockingConfigs, saveAndApplyMockingConfigs }
