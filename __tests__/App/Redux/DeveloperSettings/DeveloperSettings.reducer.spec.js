import { store } from 'App/Redux'
import { developerSettingsActions } from 'App/Redux/reducers/DeveloperSettings.reducer'

describe('unit testing for Developer Settings reducer', () => {
  it('should set TestCase name and TestCase URL succesfully', () => {
    const expectedTestCaseInfo = {
      testCaseName: 'TEST_CASE_NAME_123',
      mockFileName: 'MOCK_FILE_NAME_123'
    }
    store.dispatch(
      developerSettingsActions.setMockFileName('MOCK_FILE_NAME_123')
    )
    store.dispatch(
      developerSettingsActions.setTestCaseName('TEST_CASE_NAME_123')
    )
    const testCaseInfo = store.getState().developerSettings.mockingConfigs
    expect(testCaseInfo).toMatchObject(expectedTestCaseInfo)
  })

  it('should clear APIsRequestsLogs succesfully', () => {
    const expected = {
      requests: []
    }
    store.dispatch(developerSettingsActions.clearAPIsRequestsLogs())

    const actual = store.getState().developerSettings.APIsRequestsLogs
    expect(actual).toMatchObject(expected)
  })

  it('should set APIsRequestsLogs succesfully', () => {
    const expected = {
      requests: ['test']
    }
    store.dispatch(developerSettingsActions.appendAPIsRequestsLogs('test'))

    const actual = store.getState().developerSettings.APIsRequestsLogs
    expect(actual).toMatchObject(expected)
  })
})
