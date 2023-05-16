import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

const fetchPrivacySettingsDetails = async ({ URL, apiId }) => {
  try {
    const { data } = await legacyAxios.get(URL, { apiId })

    if (data) {
      return data
    }
  } catch (error) {
    throw error
  }
}

export { fetchPrivacySettingsDetails }
