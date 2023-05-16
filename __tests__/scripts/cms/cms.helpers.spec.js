import { getFileNameFromCMSItem } from 'scripts/cms/cms.helpers'

describe('test scripts helper functions ', () => {
  test('should getFileNameFromCMSItem return correct result when calling it with cms item that has id', () => {
    const cmsItem = {
      id: 'anyName',
      resource: 'https://any/cms/internationalisation/dummyFile'
    }
    const fileName = getFileNameFromCMSItem(cmsItem)

    expect(fileName).toEqual('anyName')
  })

  test('should getFileNameFromCMSItem return correct result when calling it with cms item that has resource only', () => {
    const cmsItem = {
      resource: 'https://any/cms/internationalisation/dummyFile'
    }
    const fileName = getFileNameFromCMSItem(cmsItem)

    expect(fileName).toEqual('dummyFile')
  })
})
