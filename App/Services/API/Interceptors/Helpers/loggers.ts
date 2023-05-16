import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LoggerManager } from '@vfgroup-oneplatform/foundation'

import { developerSettingsActions } from 'App/Redux/reducers/DeveloperSettings.reducer'
import { store } from 'App/Redux'

const LogRequest = (request: AxiosRequestConfig) => {
  LoggerManager.configure(console, [], [], true, false)
  LoggerManager.log('----------⭐️ Request ⭐️ ----------')
  LoggerManager.log('Method :', request.method)
  LoggerManager.log('BaseUrl :', request.baseURL)
  LoggerManager.log('URL :', request.url)
  LoggerManager.log('Headers :', request.headers)
  LoggerManager.log('Body :', request.data)
  LoggerManager.log('ApiId :', request.apiId)
  request.type = 'request'
  appendAPIsRequestsLogs(request)
}

const LogResponse = (response: AxiosResponse) => {
  LoggerManager.configure(console, [], [], true, false)
  LoggerManager.log('----------⭐️⭐️ Response ⭐️⭐️ ----------')
  LoggerManager.log('HTTP status code :', response.status)
  LoggerManager.log('URL :', response.config.url)
  LoggerManager.log('Headers :', response.headers)
  LoggerManager.log('Body :', response.data)
  response.type = 'response'
  appendAPIsRequestsLogs(response)
}

const appendAPIsRequestsLogs = (request) => {
  store.dispatch(
    developerSettingsActions.appendAPIsRequestsLogs(
      JSON.parse(JSON.stringify(request))
    )
  )
}

export { LogRequest, LogResponse }
