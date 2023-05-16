import SInfo from 'react-native-sensitive-info'

import { getItem, setItem, removeItem } from 'App/Utils/SensitiveInfoManager'

describe('test SensitiveInfoManager functions ', () => {
  test('should render getItem from SensitiveInfoManager', async () => {
    let value
    try {
      value = await getItem('appKey')
    } catch (error) {}
    expect(value).toBe(null)
    expect(SInfo.getItem).toHaveBeenCalled()
  })

  test('should render setItem from SensitiveInfoManager', async () => {
    let value
    try {
      value = await setItem('appKey', 'DALIA')
    } catch (error) {}
    expect(value).toBe(undefined)
    expect(SInfo.setItem).toHaveBeenCalled()
  })

  test('should render get from SensitiveInfoManager', async () => {
    try {
      await removeItem('appKey')
    } catch (error) {}
    expect(SInfo.deleteItem).toHaveBeenCalled()
  })
})
