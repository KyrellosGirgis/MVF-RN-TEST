import { useEffect, useState } from 'react'

const useApiCall = (loadDataApi: Function, extraAPIParams?: any) => {
  const [responseData, setResponseData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const loadData = async (_loadDataApi: Function, extraAPIParams?: any) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const data: any = await _loadDataApi(extraAPIParams)
      setResponseData(data)
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }
  const refreshData = async (extraAPIRefreshParams: any) => {
    loadData(loadDataApi, extraAPIRefreshParams)
  }

  useEffect(() => {
    loadData(loadDataApi, extraAPIParams)
  }, [])
  return {
    responseData,
    isLoading,
    isError,
    refresh: refreshData,
    callNextApi: loadData
  }
}

export default useApiCall
