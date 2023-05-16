import axios from 'axios'

import Config from 'react-native-config'

import { ApiMockFileResponse } from 'App/Services/API/Requests/DeveloperSettings/DeveloperSettings'

const fetchMockingTestCases = async (filename: string) => {
  const { data } = await axios.get(Config.MOCK_BASE_URL + filename)
  const testCasesList: ApiMockFileResponse = data.testCases
  return testCasesList
}

export { fetchMockingTestCases }
