import { useEffect, useState } from 'react'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

const useEncryptedStorage = (keys: string[]) => {
  const [resultObjects, setResultObjects] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const getDataFromEncrypedStorage = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const allItems: any = await EncryptedStorage.getAllItems()
      const filteredItems: any = {}

      keys.forEach((key) => {
        filteredItems[key] = allItems[key]
      })

      setResultObjects(filteredItems)
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getDataFromEncrypedStorage()
  }, [])

  return {
    ...resultObjects,
    isLoading,
    isError
  }
}

export default useEncryptedStorage
