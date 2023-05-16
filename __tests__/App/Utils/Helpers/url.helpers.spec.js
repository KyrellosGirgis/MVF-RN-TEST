import { getOffestFromUrl } from 'App/Utils/Helpers/url.helpers'

describe('test url Helper functions ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should return offset value when passing url contain offset key', () => {
    const urlContainOffsetKey =
      'https://api.vodafone.de/mva/v1/history?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&offset=3&limit=3'
    expect(getOffestFromUrl(urlContainOffsetKey)).toEqual('3')
  })
  test('should return null when passing url does not contain offset key', () => {
    const urlWithoutOffsetKey =
      'https://api.vodafone.de/mva/v1/history?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&limit=3'
    expect(getOffestFromUrl(urlWithoutOffsetKey)).toEqual(undefined)
  })
  test('should return null when passing url is null', () => {
    expect(getOffestFromUrl(null)).toEqual(undefined)
  })
  test('should return null when passing url is empty', () => {
    expect(getOffestFromUrl('')).toEqual(undefined)
  })
})
