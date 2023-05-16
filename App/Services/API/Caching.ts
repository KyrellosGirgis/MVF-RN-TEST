import { IAxiosCacheAdapterOptions } from 'axios-cache-adapter'
import Config from 'react-native-config'

import StorageCacheStore from 'App/Services/StorageWrappers/StorageCacheStore/StorageCacheStore'

const defaultCache: IAxiosCacheAdapterOptions = {
  maxAge: 0,
  exclude: {
    query: false,
    methods: ['patch', 'delete']
  },
  debug: Config.IS_PRODUCTION === 'false',
  clearOnStale: true,
  store: StorageCacheStore
}

export { defaultCache }
